import { useState } from "react"

function App() {
  const [counter, setCounter] = useState<number>(0)


  const addValue = (): void => {
    setCounter(counter + 1)
    console.log(counter)
  }

  const subtractValue = (): void => {
    if (counter > 0) {
      setCounter(counter - 1)
      console.log(counter)
    } else {
      setCounter(0)
    }
  }


  return (
    <>
      <h1>Counter value: {counter}</h1>
      
      <button
        onClick={addValue}
      >Increment</button>
      <br />
      <button
        onClick={subtractValue}
      >Decrement</button>
    </>
  )
}

export default App
