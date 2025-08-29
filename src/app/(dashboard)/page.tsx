import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import FolderList from "@/components/folder-list"
import BookmarkForm from "@/components/bookmark-form"
import BookmarkItem from "@/components/bookmark-item"
import Input from "@/app/components/ui/input"

export default async function Home({ searchParams }: { searchParams?: { q?: string } }) {
    const q = (searchParams?.q || "").trim()
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect("/login")

    const { data: folders } = await supabase.from("folders").select("*").order("created_at")

    let query = supabase.from("bookmarks").select("*").order("created_at", { ascending: false })
    if (q) query = query.ilike("title", `%${q}%`).or(`url.ilike.%${q}%,note.ilike.%${q}%`)
    const { data: bookmarks } = await query

    async function deleteBookmark(id: string) {
        "use server"
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
        )
        await supabase.from("bookmarks").delete().eq("id", id)
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
            <div className="space-y-4">
                <FolderList folders={folders || []} />
                <CreateFolder />
            </div>

            <div className="space-y-4">
                <form className="flex w-full items-center gap-2" action="/">
                    <Input name="q" placeholder="ค้นหา title / url / note" defaultValue={q} />
                    <button className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm">
                        ค้นหา
                    </button>
                </form>

                <BookmarkForm folders={folders || []} afterSave={() => { }} />

                <div className="grid gap-3">
                    {bookmarks?.map((b) => (
                        <BookmarkItem key={b.id} b={b} onDelete={deleteBookmark as any} />
                    ))}
                </div>
            </div>
        </div>
    )
}

async function CreateFolder() {
    const create = async (formData: FormData) => {
        "use server"
        const name = String(formData.get("name") || "").trim()
        if (!name) return
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
        )
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        await supabase.from("folders").insert({ user_id: user.id, name })
    }

    return (
        <form action={create} className="rounded-3xl border border-neutral-200 bg-white p-3 card-shadow">
            <div className="mb-2 text-sm font-semibold">สร้างโฟลเดอร์</div>
            <div className="flex gap-2">
                <input
                    name="name"
                    placeholder="ชื่อโฟลเดอร์"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm"
                />
                <button className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm">
                    เพิ่ม
                </button>
            </div>
        </form>
    )
}
