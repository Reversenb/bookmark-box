import Link from "next/link"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export default async function Navbar() {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: async (name: string) => (await cookieStore).get(name)?.value } }
    )
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-40 bg-[var(--brand)] text-white">
            <div className="flex h-16 items-center justify-between gap-4 px-4">
                <Link href="/" className="text-lg font-bold">Bookmark Box</Link>
                <nav className="flex items-center gap-4 text-sm">
                    {user ? (
                        <>
                            <Link href="/" className="hover:underline">Home</Link>
                            <Link href="/search" className="hover:underline">Search</Link>
                        </>
                    ) : (
                        <Link href="/login" className="hover:underline">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    )
}
