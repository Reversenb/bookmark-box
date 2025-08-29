import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import FolderList from "@/app/components/folder-list"
import BookmarkItem from "@/app/components/bookmark-item"

export default async function FolderPage({ params }: { params: { id: string } }) {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: async (name: string) => (await cookieStore).get(name)?.value } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect("/login")

    const { data: folders } = await supabase.from("folders").select("*").order("created_at")
    const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("folder_id", params.id)
        .order("created_at", { ascending: false })

    async function deleteBookmark(id: string) {
        "use server"
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { get: async (name: string) => (await cookieStore).get(name)?.value } }
        )
        await supabase.from("bookmarks").delete().eq("id", id)
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
            <FolderList folders={folders || []} currentId={params.id} />
            <div className="space-y-3">
                {bookmarks?.map((b) => (
                    <BookmarkItem key={b.id} b={b} onDelete={deleteBookmark as any} />
                ))}
            </div>
        </div>
    )
}
