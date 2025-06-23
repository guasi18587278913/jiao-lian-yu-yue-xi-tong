import Image from "next/image"
import { InternalBadge } from "@/components/internal-badge"
import { HomePageClient } from "./page-client"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-cyan-50 pt-16">
      {/* Hero Section */}
      <main className="flex flex-grow animate-fade-in-up flex-col items-center justify-center p-4">
        <div className="container mx-auto text-center">
          <InternalBadge />
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              深海圈 · YouTube Shorts 训练营
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-500">
            两步预约 · 30秒搞定和教练的1v1
          </p>
          <HomePageClient />
        </div>
      </main>
    </div>
  )
}
