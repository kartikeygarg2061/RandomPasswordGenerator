import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")
  const passwordCopy = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str = str + "0123456789"
    if (charAllowed) str = str + "~!@#$%^&*()_=-{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassword(pass)
  }, [length, numberAllowed, charAllowed, setpassword])

  const CopytoClipboard = useCallback(()=>{
    passwordCopy.current?.select();
    passwordCopy.current.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [passwordGenerator, length, numberAllowed, charAllowed])

  return (
    <>
      <div className='bg-gray-700 w-full max-w-lg overflow-hidden mx-auto p-4 rounded-lg text-white my-8'>
        <h1 className='text-center my-5 text-3xl'>Password Generator</h1>
        <div className='flex bg-white rounded-lg'>
          <input type="text" value={password} placeholder='Password' className='text-orange-500 rounded-lg w-full px-3 py-2 outline-none border-none text-lg font-semibold' readOnly ref={passwordCopy}/>
          <button className='bg-orange-500 rounded-lg px-4 hover:text-black text-white text-xl' onClick={CopytoClipboard}>Copy</button>
        </div>

        <div className='mt-5 flex'>
          <div className='flex gap-1 text-orange-500 text-lg'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}} />
          <label>{length}</label>
          </div>

          <div className='flex gap-2 align-middle mx-6'>
            <input type="checkbox" className='cursor-pointer' defaultValue={numberAllowed} id='numberInput' onChange={()=>{setnumberAllowed((prev)=>!prev)}}/>
            <label className='text-orange-500 text-xl'>Numbers</label>
          </div>

          <div className='flex gap-2 align-middle'>
            <input type="checkbox" className='cursor-pointer' defaultValue={charAllowed} id='charInput' onChange={()=>{setcharAllowed((prev)=>!prev)}}/>
            <label className='text-orange-500 text-xl'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}


export default App
