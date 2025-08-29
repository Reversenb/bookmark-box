import { cn } from "@/app/lib/utils"
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm input-focus",
                props.className
            )}
        />
    )
}
