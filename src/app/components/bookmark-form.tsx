"use client"
import { useState } from "react"
import Input from "@/app/components/ui/input"
import Textarea from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"

export default function BookmarkForm({ folders, initial, afterSave }: { folders: any[]; initial?: any; afterSave?: () => void }) {
    const [url, setUrl] = useState(initial?.url || "")
    const [title, setTitle] = useState(initial?.title || "")
    const [folderId, setFolderId] = useState(initial?.folder_id || "")
    const [tags, setTags] = useState((initial?.tags || []).join(","))
    const [note, setNote] = useState(initial?.note || "")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const body = {
            id: initial?.id,
            url, title, folder_id: folderId || null,
            tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
            note,
        }
        const method = initial ? "PUT" : "POST"
        const res = await fetch("/api/bookmarks", { method, body: JSON.stringify(body) })
        setLoading(false)
        if (!res.ok) return alert("บันทึกล้มเหลว")
        afterSave?.()
        if (!initial) {
            setUrl(""); setTitle(""); setTags(""); setNote("")
            location.reload()
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-neutral-200 bg-white p-4 card-shadow">
            <Input placeholder="https://…" value={url} onChange={e => setUrl(e.target.value)} required />
            <Input placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)} />
            <select value={folderId} onChange={e => setFolderId(e.target.value)} className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm">
                <option value="">— ไม่มีโฟลเดอร์ —</option>
                {folders?.map((f: any) => (<option key={f.id} value={f.id}>{f.name}</option>))}
            </select>
            <Input placeholder="tags คั่นด้วยคอมมา เช่น dev,video,ai" value={tags} onChange={e => setTags(e.target.value)} />
            <Textarea placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
            <div className="flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? "กำลังบันทึก…" : (initial ? "อัปเดต" : "เพิ่มบุ๊กมาร์ก")}</Button>
            </div>
        </form>
    )
}
