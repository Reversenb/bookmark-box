"use client"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export default function BookmarkItem({ b, onDelete }: { b: any; onDelete: (id: string) => void }) {
    const open = () => window.open(b.url, "_blank")
    const remove = async () => { if (confirm("ลบรายการนี้?")) onDelete(b.id) }
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-4 card-shadow">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <button onClick={open} className="truncate text-left text-base font-medium underline decoration-[var(--brand)] text-[var(--brand)]">
                        {b.title || b.url}
                    </button>
                    <div className="truncate text-xs text-neutral-500">{b.url}</div>
                    {b.tags?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {b.tags.map((t: string) => (<Badge key={t} className="bg-red-100 text-red-700">#{t}</Badge>))}
                        </div>
                    ) : null}
                    {b.note ? <p className="mt-2 text-sm text-neutral-700">{b.note}</p> : null}
                </div>
                <div className="shrink-0 space-x-2">
                    <Link href={`/bookmark/${b.id}/edit`} className="inline-block"><Button variant="ghost">แก้ไข</Button></Link>
                    <Button variant="danger" onClick={remove}>ลบ</Button>
                </div>
            </div>
        </div>
    )
}
