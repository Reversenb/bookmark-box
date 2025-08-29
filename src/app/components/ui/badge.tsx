import { cn } from "@/app/lib/utils"
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700", className)}>
            {children}
        </span>
    )
}
