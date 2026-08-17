import React, { useId } from 'react'

export type Option = { 
    value: string | number; 
    label: React.ReactNode 
}

export type SelectProps = {
    options?: Option[]
    label?: string
    className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

function Select({ options = [], label, className = '', id, ...props }: SelectProps, ref: React.Ref<HTMLSelectElement>) {
    const generatedId = useId()
    const selectId = id || generatedId

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={selectId} className="block mb-1 text-sm font-medium">
                    {label}
                </label>
            )}
            <select id={selectId} ref={ref} className={className} {...props}>
                {options.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef<HTMLSelectElement, SelectProps>(Select)