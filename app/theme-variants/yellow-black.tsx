"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Shield, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function YellowBlackTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">生财深海圈</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">登录</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">注册</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-yellow-400 text-black px-6 py-2 rounded-lg inline-block mb-6 font-bold text-lg">
            3月航海选题
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">连接学员与教练</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
              高效预约管理
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            为团队内部打造的专业咨询预约系统，支持教练时间管理、学员便捷预约、智能通知提醒，完全免费使用
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-lg">
                学员入口
              </Button>
            </Link>
            <Link href="/coach">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-bold">
                教练入口
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold"
              >
                管理员入口
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">三端协同，高效管理</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Portal */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-yellow-100 to-amber-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-700" />
                </div>
                <CardTitle className="text-xl text-gray-900">圈友端（学员）</CardTitle>
                <CardDescription>便捷预约，轻松管理</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    浏览教练信息和专长领域
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    选择合适时间进行预约
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    查看预约历史和状态
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    接收预约提醒通知
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Coach Portal */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-gray-100 to-slate-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl text-gray-900">教练端（老师）</CardTitle>
                <CardDescription>时间管理，预约处理</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                    设置个人资料和专长
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                    管理可预约时间段
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                    处理学员预约请求
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                    查看咨询历史记录
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-amber-100 to-yellow-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-amber-700" />
                </div>
                <CardTitle className="text-xl text-gray-900">管理员端</CardTitle>
                <CardDescription>全局管理，数据分析</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    管理用户账户信息
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    查看所有预约记录
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    处理预约冲突问题
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    生成统计分析报表
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
