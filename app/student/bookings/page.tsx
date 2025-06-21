"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, ArrowLeft, MessageSquare, Star, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock booking data
const bookings = {
  upcoming: [
    {
      id: 1,
      coach: {
        name: "张教练",
        avatar: "/placeholder.svg?height=48&width=48&text=张",
        specialties: ["电商运营", "社群营销"],
      },
      time: "2024-01-16 14:00",
      duration: "30分钟",
      topic: "电商运营策略咨询",
      status: "confirmed",
      meetingLink: "https://meet.example.com/abc123",
    },
    {
      id: 2,
      coach: {
        name: "李老师",
        avatar: "/placeholder.svg?height=48&width=48&text=李",
        specialties: ["投资理财", "副业规划"],
      },
      time: "2024-01-17 10:00",
      duration: "30分钟",
      topic: "投资理财规划",
      status: "confirmed",
      meetingLink: "https://meet.example.com/def456",
    },
  ],
  pending: [
    {
      id: 3,
      coach: {
        name: "王导师",
        avatar: "/placeholder.svg?height=48&width=48&text=王",
        specialties: ["短视频制作", "直播带货"],
      },
      time: "2024-01-18 16:00",
      duration: "30分钟",
      topic: "短视频制作技巧",
      status: "pending",
    },
  ],
  completed: [
    {
      id: 4,
      coach: {
        name: "张教练",
        avatar: "/placeholder.svg?height=48&width=48&text=张",
        specialties: ["电商运营", "社群营销"],
      },
      time: "2024-01-10 14:00",
      duration: "30分钟",
      topic: "电商平台选择建议",
      status: "completed",
      rating: 5,
      feedback: "非常有帮助的咨询，张教练给出了很多实用的建议！",
    },
    {
      id: 5,
      coach: {
        name: "李老师",
        avatar: "/placeholder.svg?height=48&width=48&text=李",
        specialties: ["投资理财", "副业规划"],
      },
      time: "2024-01-08 15:00",
      duration: "30分钟",
      topic: "理财产品分析",
      status: "completed",
      rating: 4,
      feedback: "专业的分析，帮助我更好地理解了不同理财产品的特点。",
    },
  ],
}

export default function StudentBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">已确认</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">待确认</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">已完成</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">已取消</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/student">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">我的预约</h1>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              退出
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">即将到来 ({bookings.upcoming.length})</TabsTrigger>
            <TabsTrigger value="pending">待确认 ({bookings.pending.length})</TabsTrigger>
            <TabsTrigger value="completed">已完成 ({bookings.completed.length})</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {bookings.upcoming.length > 0 ? (
              bookings.upcoming.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={booking.coach.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{booking.coach.name}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{booking.coach.name}</CardTitle>
                          <CardDescription>{booking.coach.specialties.join(" • ")}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{booking.time}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{booking.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">咨询主题：</span>
                        <span className="text-gray-600">{booking.topic}</span>
                      </div>
                      {booking.meetingLink && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="text-sm text-gray-500">会议将在预约时间前15分钟开放</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              联系教练
                            </Button>
                            <Button size="sm">加入会议</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无即将到来的预约</h3>
                <p className="text-gray-600 mb-4">您还没有确认的预约安排</p>
                <Link href="/student">
                  <Button>浏览教练</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Pending Bookings */}
          <TabsContent value="pending" className="space-y-4">
            {bookings.pending.length > 0 ? (
              bookings.pending.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={booking.coach.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{booking.coach.name}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{booking.coach.name}</CardTitle>
                          <CardDescription>{booking.coach.specialties.join(" • ")}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{booking.time}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{booking.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">咨询主题：</span>
                        <span className="text-gray-600">{booking.topic}</span>
                      </div>
                      <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-sm text-yellow-800">等待教练确认，通常在24小时内会收到回复</span>
                      </div>
                      <div className="flex justify-end pt-3 border-t">
                        <Button size="sm" variant="outline">
                          取消预约
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无待确认的预约</h3>
                <p className="text-gray-600">您的所有预约都已得到处理</p>
              </div>
            )}
          </TabsContent>

          {/* Completed Bookings */}
          <TabsContent value="completed" className="space-y-4">
            {bookings.completed.length > 0 ? (
              bookings.completed.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={booking.coach.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{booking.coach.name}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{booking.coach.name}</CardTitle>
                          <CardDescription>{booking.coach.specialties.join(" • ")}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{booking.time}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{booking.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">咨询主题：</span>
                        <span className="text-gray-600">{booking.topic}</span>
                      </div>
                      {booking.rating && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">我的评分：</span>
                            <div className="flex">{renderStars(booking.rating)}</div>
                          </div>
                          {booking.feedback && (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">"{booking.feedback}"</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex justify-end pt-3 border-t">
                        <Button size="sm" variant="outline">
                          再次预约
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无完成的预约</h3>
                <p className="text-gray-600">完成咨询后，记录会显示在这里</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
