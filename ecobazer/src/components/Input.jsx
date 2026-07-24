import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  const inputId = id || props.name

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-900/80">
          {label}
        </label>
      )}
      <input id={inputId} ref={ref} className={`input-field ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/25' : ''} ${className}`} {...props} />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
