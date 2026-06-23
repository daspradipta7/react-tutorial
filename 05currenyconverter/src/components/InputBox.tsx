interface InputBoxProps {
  id: number
}

function InputBox({ id }: InputBoxProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm w-full">
      <input
        type="number"
        placeholder={id === 1 ? "Enter Amount from" : "Enter Amount To"}
        className="w-full px-4 py-4 text-gray-700 outline-none rounded-md"
        min={1}
        max={1000000}
      />
    </div>
  )
}

export default InputBox