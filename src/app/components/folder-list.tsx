import Link from "next/link"
import { Card } from "@/app/components/ui/card"

export default function FolderList({ folders, currentId }: { folders: any[]; currentId?: string }) {
    return (
        <Card className="p-3">
            <div className="mb-2 text-sm font-semibold">โฟลเดอร์</div>
            <ul className="space-y-1">
                <li>
                    <Link
                        href="/"
                        className={`block rounded-xl px-3 py-2 text-sm ${!currentId ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                    >
                        ทั้งหมด
                    </Link>
                </li>
                {folders?.map((f) => (
                    <li key={f.id}>
                        <Link
                            href={`/folder/${f.id}`}
                            className={`block rounded-xl px-3 py-2 text-sm ${currentId === f.id ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                        >
                            {f.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </Card>
    )
}
