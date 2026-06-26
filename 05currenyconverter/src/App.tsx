import { useState } from 'react'
import InputBox from './components/InputBox'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import type { CurrencyData } from './hooks/useCurrencyInfo'

function App() {
  const [fromcurrency, setFromCurrency] = useState<string>('usd')
  const [tocurrency, setToCurrency] = useState<string>('inr')

  const [amount, setAmount] = useState<number>(0)
  const [convertedAmount, setconvertedAmount] = useState<number>(0)

  const currencyInfo: CurrencyData = useCurrencyInfo(fromcurrency)
  const currencyOptions: string[] = Object.keys(currencyInfo)

  const covert = () => {
    setconvertedAmount(amount * (currencyInfo[tocurrency] || 0))
  }

  const swap = () => {
    const temp = fromcurrency
    setFromCurrency(tocurrency)
    setToCurrency(temp)
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-white border border-gray-300 rounded-md shadow-sm  bg-[url('/pexels-pixabay-534216.jpg')]">
      {/* Container with relative positioning */}
      <div className="relative flex flex-col w-2/4 h-2/3 gap-2 justify-center items-center bg-gray-700/70 p-5 m-auto rounded-md shadow-lg border-2 border-gray-700 backdrop-opacity-50">
        <InputBox 
          id="input-box-1" 
          label="From" 
          currencyOptions={currencyOptions}
          currency={fromcurrency}
          amount={amount}
          onCurrencyChange={(fromcurrency: string) => setFromCurrency(fromcurrency)}
          onAmountChange={(amount: number) => setAmount(amount)}
          
        />
        
        {/* Absolute positioned button to sit between the boxes */}
        <button
          className="absolute left-1/2 -translate-x-1/2 top-[calc(40%-10px)] bg-blue-500 text-white px-4 py-2 rounded-md z-10 border-2 border-gray-700"
          onClick={swap}
        >
          Swap
        </button>

        <InputBox 
          id="input-box-2" 
          label="To" 
          currencyOptions={currencyOptions} 
          currency={tocurrency} 
          amount={convertedAmount}
          onCurrencyChange={(tocurrency: string) => setToCurrency(tocurrency)}
          onAmountChange={(amount: number) => setconvertedAmount(amount)}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4 border-2 border-gray-500 w-full"
          onClick={covert}
        >
          Convert {fromcurrency.toUpperCase()} to {tocurrency.toUpperCase()}
        </button>
      </div>
    </div>
  )
}

export default App