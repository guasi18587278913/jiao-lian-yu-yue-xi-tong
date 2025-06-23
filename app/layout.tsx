import type { Metadata } from 'next'
import './globals.css'
import { Inter } from "next/font/google"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: '深海圈教练预约系统',
  description: '深海圈-YouTube shorts 教练1v1预约系统',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
