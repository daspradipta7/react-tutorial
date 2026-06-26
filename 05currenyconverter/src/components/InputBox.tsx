interface InputBoxProps {
  id: string,
  label: string,
  currencyOptions?: string[]
  currency?: string
  amount?: number,
  onCurrencyChange?: (currency: string) => void,
  onAmountChange?: (amount: number) => void,
}

function InputBox({ id, label, currencyOptions, currency, amount, onCurrencyChange, onAmountChange }: InputBoxProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-md shadow-sm w-full">
      <div className="flex flex-row justify-between items-center font-normal">
        <div className="text-sm w-1/2 p-2  text-gray-700">{label}</div>
        <div className="ml-2 text-sm w-1/2 text-end p-2">Currency Type</div>
      </div>
      <div>
      <div className="flex flex-row justify-between items-center w-full">
      <div className="w-1/3 p-2">
        <input
        id={id}
        type="number"
        placeholder={label === "From" ? "Enter Amount from" : "Enter Amount To"}
        className="w-full h-10 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center"
        min={1}
        max={1000000}
        {...((label === "To" && amount !== undefined && amount > 0) ? { value: amount } : {}) }
        onChange={(e) => {
          const newAmount = parseFloat(e.target.value);
          if (!isNaN(newAmount) && onAmountChange) {
            onAmountChange(newAmount);
          }
        }}
      />
      </div>
        <div className="flex text-sm justify-end items-center w-1/3 p-2">
          <select className="w-1/2  h-10 allign-center text-center rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            if (onCurrencyChange) {
              onCurrencyChange(e.target.value);
            }
          }}
          >
          {
            currencyOptions?.map((option) => (
              <option key={option} value={option} selected={option === currency}>
                {option.toUpperCase()}
              </option>
            ))
          }
          </select>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default InputBox