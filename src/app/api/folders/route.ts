import { NextRequest, NextResponse } from "next/server"
import { createClientSSR } from "@/app/lib/supabase"

export async function POST(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createClientSSR(req, res)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

    const body = await req.json()
    const { data, error } = await supabase.from("folders").insert({ user_id: user.id, name: body.name }).select("*").single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createClientSSR(req, res)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })

    const { error } = await supabase.from("folders").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
}
