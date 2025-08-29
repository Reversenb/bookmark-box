import { cn } from "@/app/lib/utils"

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("rounded-3xl border border-neutral-200 bg-white p-4 card-shadow", className)}>{children}</div>
}
