import "@/app/globals.css"
import Navbar from "@/app/components/navbar"

export const metadata = {
  title: "Bookmark Box",
  description: "Save links neatly with folders, tags, and search",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-neutral-50 text-neutral-900">
        <div className="min-h-dvh max-w-5xl mx-auto px-4 sm:px-6">
          <Navbar />
          <main className="py-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
