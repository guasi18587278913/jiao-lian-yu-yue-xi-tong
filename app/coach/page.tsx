"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Settings, BarChart3, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for coach dashboard
const coachData = {
  name: "张教练",
  avatar: "/placeholder.svg?height=64&width=64&text=张",
  specialties: ["电商运营", "社群营销", "内容创作"],
  rating: 4.9,
  totalBookings: 128,
  thisMonthBookings: 24,
}

const pendingBookings = [
  {
    id: 1,
    studentName: "李同学",
    time: "2024-01-15 14:00",
    duration: "30分钟",
    topic: "电商运营策略咨询",
    status: "pending",
  },
  {
    id: 2,
    studentName: "王同学",
    time: "2024-01-15 16:00",
    duration: "30分钟",
    topic: "社群营销方案讨论",
    status: "pending",
  },
]

const upcomingBookings = [
  {
    id: 3,
    studentName: "赵同学",
    time: "2024-01-16 10:00",
    duration: "30分钟",
    topic: "内容创作指导",
    status: "confirmed",
  },
  {
    id: 4,
    studentName: "陈同学",
    time: "2024-01-16 15:00",
    duration: "30分钟",
    topic: "电商平台选择建议",
    status: "confirmed",
  },
]

const availableSlots = [
  { date: "2024-01-15", slots: ["09:00", "11:00", "14:00", "16:00"] },
  { date: "2024-01-16", slots: ["10:00", "13:00", "15:00", "17:00"] },
  { date: "2024-01-17", slots: ["09:00", "14:00", "16:00"] },
]

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleBookingAction = (bookingId: number, action: "accept" | "reject") => {
    console.log(`${action} booking ${bookingId}`)
    // Here you would typically make an API call to update the booking status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={coachData.avatar || "/placeholder.svg"} />
              <AvatarFallback>{coachData.name}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">教练中心</h1>
              <p className="text-sm text-gray-600">欢迎回来，{coachData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm">
                退出
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="bookings">预约管理</TabsTrigger>
            <TabsTrigger value="schedule">时间管理</TabsTrigger>
            <TabsTrigger value="profile">个人资料</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">本月预约</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{coachData.thisMonthBookings}</div>
                  <p className="text-xs text-muted-foreground">+12% 较上月</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总预约数</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{coachData.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">累计咨询</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">评分</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{coachData.rating}</div>
                  <p className="text-xs text-muted-foreground">平均评分</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">帮助学员</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">累计帮助人数</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>待处理预约</CardTitle>
                  <CardDescription>需要您确认的预约请求</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{booking.studentName}</div>
                          <div className="text-sm text-gray-600">{booking.time}</div>
                          <div className="text-sm text-gray-500">{booking.topic}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleBookingAction(booking.id, "accept")}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            接受
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBookingAction(booking.id, "reject")}>
                            <XCircle className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>即将到来的咨询</CardTitle>
                  <CardDescription>已确认的预约安排</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-green-50"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{booking.studentName}</div>
                          <div className="text-sm text-gray-600">{booking.time}</div>
                          <div className="text-sm text-gray-500">{booking.topic}</div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          已确认
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>预约管理</CardTitle>
                <CardDescription>管理所有预约请求和已确认的咨询</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">待处理</TabsTrigger>
                    <TabsTrigger value="confirmed">已确认</TabsTrigger>
                    <TabsTrigger value="completed">已完成</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pending" className="space-y-4 mt-6">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="font-medium">{booking.studentName}</div>
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              待确认
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {booking.time} ({booking.duration})
                          </div>
                          <div className="text-sm text-gray-500">{booking.topic}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleBookingAction(booking.id, "accept")}>
                            接受
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBookingAction(booking.id, "reject")}>
                            拒绝
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="confirmed" className="space-y-4 mt-6">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="font-medium">{booking.studentName}</div>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已确认
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {booking.time} ({booking.duration})
                          </div>
                          <div className="text-sm text-gray-500">{booking.topic}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          查看详情
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>时间管理</CardTitle>
                <CardDescription>设置您的可预约时间段</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {availableSlots.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">{day.date}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {day.slots.map((slot, slotIndex) => (
                          <Button key={slotIndex} variant="outline" size="sm" className="justify-center">
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    添加更多时间段
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>管理您的个人信息和专业资料</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={coachData.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{coachData.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{coachData.name}</h3>
                      <p className="text-gray-600">专业教练</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        更换头像
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">专长领域</h4>
                    <div className="flex flex-wrap gap-2">
                      {coachData.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">
                      编辑专长
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">联系方式</h4>
                      <p className="text-sm text-gray-600">coach@example.com</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">服务状态</h4>
                      <p className="text-sm text-gray-600">内部免费咨询</p>
                    </div>
                  </div>

                  <Button>保存更改</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
