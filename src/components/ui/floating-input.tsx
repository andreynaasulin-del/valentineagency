import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, id, label, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false)

        return (
            <div className="w-full flex flex-col gap-2">
                <label
                    htmlFor={id}
                    className={cn(
                        "text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
                        isFocused ? "text-rose-400" : "text-brown-400"
                    )}
                >
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    className={cn(
                        "w-full bg-transparent border-b-2 border-cream-300 py-3 text-brown-700 focus:outline-none focus:border-rose-400 transition-colors duration-300 font-serif text-lg disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    onFocus={(e) => {
                        setIsFocused(true)
                        props.onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        props.onBlur?.(e)
                    }}
                    {...props}
                />
            </div>
        )
    }
)
FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
