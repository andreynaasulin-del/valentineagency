import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, id, label, ...props }, ref) => {
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
                <div className="relative">
                    <select
                        id={id}
                        className={cn(
                            "w-full bg-transparent border-b-2 border-cream-300 py-3 pr-8 text-brown-700 focus:outline-none focus:border-rose-400 transition-colors duration-300 font-serif text-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
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
                    >
                        {children}
                    </select>
                    <ChevronDown className="w-4 h-4 text-brown-300 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
        )
    }
)
FloatingSelect.displayName = "FloatingSelect"

export { FloatingSelect }
