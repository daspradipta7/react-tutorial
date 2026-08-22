import React, { useId } from 'react'

function Input({
    type = 'text',
    placeholder = '',
    label,
    ...props
}: {
    type?: string;
    placeholder?: string;
    label?: string;
    [key: string]: any;
}, ref: React.Ref<HTMLInputElement>) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor={id}>
            {label}
        </label>}
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className='w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            {...props}
            ref={ref}
        />
    </div>
  )
}

export default React.forwardRef(Input)