import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { InternalBadge } from "@/components/internal-badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="生财有术 Logo" width={140} height={35} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="container mx-auto text-center">
          <InternalBadge />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              深海圈-YouTube shorts
            </span>
          </h1>
          <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
            教练1v1预约系统
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/student">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
              >
                学员入口
              </Button>
            </Link>
            <Link href="/coach">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-black font-semibold"
              >
                教练入口
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold"
              >
                管理员入口
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
