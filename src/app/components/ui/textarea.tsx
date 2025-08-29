import { cn } from "@/app/lib/utils"
export default function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn("w-full rounded-2xl border border-neutral-200 bg-white p-4 text-sm input-focus", props.className)}
        />
    )
}
