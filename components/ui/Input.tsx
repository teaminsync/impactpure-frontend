import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error-500 focus:ring-error-500",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-xs text-error-500 mt-1">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"

export { Input }
