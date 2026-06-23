import { useState } from 'react'
import InputBox from './components/InputBox'
import './App.css'

function App() {
  const [order, setOrder] = useState<number[]>([1, 2])

  const handleSwap = () => {
    setOrder([order[1], order[0]])
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-500">
      {/* Container with relative positioning */}
      <div className="relative flex flex-col w-1/2 gap-2">
        <InputBox id={order[0]} />
        
        {/* Absolute positioned button to sit between the boxes */}
        <button
          className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-20px)] bg-blue-500 text-white px-4 py-2 rounded-md z-10 border-2 border-gray-500"
          onClick={handleSwap}
        >
          Swap
        </button>

        <InputBox id={order[1]} />
      </div>
    </div>
  )
}

export default App