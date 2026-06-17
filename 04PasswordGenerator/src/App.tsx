import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [password, setPassword] = useState('')
  const [length, setlength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '0123456789'
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    let charcterSet = lowerCaseChars

    if (includeUppercase) charcterSet += uppercaseChars
    if (includeNumbers) charcterSet += numberChars
    if (includeSymbols) charcterSet += symbolChars

    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charcterSet.length)
      password += charcterSet[randomIndex]
    }

    setPassword(password)
  }, [length, includeNumbers, includeSymbols, includeUppercase, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSymbols, includeUppercase])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, password.length)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-top bg-pink-100 pt-20">
        <div className="flex flex-col h-32 w-2/3 justify-center items-center bg-white rounded-md shadow-md p-4">
          <div className="flex flex-1 justify-center items-center w-full">
            <div className="flex flex-row justify-center items-center w-full">
              <input type="text" className="border-2 border-gray-300 rounded-md px-2 py-2 w-2/3" placeholder="Generated Password..." readOnly value={password} ref={passwordRef} />
              <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={copyPasswordToClipboard}>Copy</button>
            </div>
          </div>
          <div className="flex flex-1 justify-center items-center w-full">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="flex flex-row justify-center items-center w-1/2">
                <input 
                type="range" 
                className="w-2/3" 
                min="8" max="64" 
                name="passwordLength" 
                id="passwordLength" 
                value={length} 
                onChange={(e) => setlength(Number(e.target.value))}
                />
                <label htmlFor="passwordLength" className="ml-2">Length: <span id="passwordLengthValue">{length}</span></label>
              </div>
              <div className="flex flex-row justify-center items-center w-1/2">
                <input type="checkbox" id="includeUppercase" name="includeUppercase" defaultChecked={includeUppercase} onChange={() => setIncludeUppercase((prev) => !prev)}/>
                <label htmlFor="includeUppercase" className="ml-2">Uppercase</label>
                <input type="checkbox" id="includeNumbers" name="includeNumbers" className="ml-4" defaultChecked={includeNumbers} onChange={() => setIncludeNumbers((prev) => !prev) } />
                <label htmlFor="includeNumbers" className="ml-2">Numbers</label>
                <input type="checkbox" id="includeSymbols" name="includeSymbols" className="ml-4" defaultChecked={includeSymbols} onChange={() => setIncludeSymbols((prev) => !prev)} />
                <label htmlFor="includeSymbols" className="ml-2">Symbols</label>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
