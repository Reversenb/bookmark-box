"use client"

import { useState } from "react"
import { createClient } from "@/app/lib/supabase"
import Input from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin },
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">เข้าสู่ระบบ</h1>
      {sent ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-4">
          ส่งลิงก์เข้าระบบไปที่อีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-3">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">ส่งลิงก์</Button>
        </form>
      )}
    </div>
  )
}
