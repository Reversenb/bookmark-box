import { createBrowserClient } from "@supabase/ssr"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export function createClientSSR(req: NextRequest, res: NextResponse) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return req.cookies.get(name)?.value },
                set(name: string, value: string, options: CookieOptions) {
                    res.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    res.cookies.set({ name, value: "", ...options })
                },
            },
        }
    )
}
