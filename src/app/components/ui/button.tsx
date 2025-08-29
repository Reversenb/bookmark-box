import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"
import React from "react"

const button = cva(
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition card-shadow",
    {
        variants: {
            variant: {
                primary: "bg-[var(--brand)] text-white hover:brightness-110",
                ghost: "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50",
                danger: "bg-rose-600 text-white hover:brightness-110",
            },
        },
        defaultVariants: { variant: "primary" },
    }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> { }

export function Button({ className, variant, ...props }: ButtonProps) {
    return <button className={cn(button({ variant }), className)} {...props} />
}
