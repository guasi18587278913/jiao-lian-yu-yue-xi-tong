"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon, Search, Star, Clock, Filter, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"

// Mock data for coaches
const coaches = [
  {
    id: 1,
    name: "张教练",
    avatar: "/placeholder.svg?height=64&width=64&text=张",
    specialties: ["电商运营", "社群营销", "内容创作"],
    rating: 4.9,
    reviews: 128,
    experience: "5年",
    description: "专注电商运营和社群营销，帮助学员快速提升变现能力",
    availableSlots: ["今天 14:00", "今天 16:00", "明天 10:00", "明天 15:00"],
  },
  {
    id: 2,
    name: "李老师",
    avatar: "/placeholder.svg?height=64&width=64&text=李",
    specialties: ["投资理财", "副业规划", "财务管理"],
    rating: 4.8,
    reviews: 95,
    experience: "8年",
    description: "资深投资顾问，专业财务规划师，助力学员财富增长",
    availableSlots: ["今天 15:00", "明天 09:00", "明天 14:00", "后天 11:00"],
  },
  {
    id: 3,
    name: "王导师",
    avatar: "/placeholder.svg?height=64&width=64&text=王",
    specialties: ["短视频制作", "直播带货", "品牌营销"],
    rating: 4.7,
    reviews: 156,
    experience: "6年",
    description: "短视频和直播领域专家，帮助学员打造个人IP",
    availableSlots: ["今天 17:00", "明天 13:00", "明天 16:00", "后天 10:00"],
  },
]

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch =
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "all" || coach.specialties.includes(selectedSpecialty)
    return matchesSearch && matchesSpecialty
  })

  if (selectedCoach) {
    const coach = coaches.find((c) => c.id === selectedCoach)
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <header className="bg-white border-b px-4 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedCoach(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <h1 className="text-xl font-semibold">预约 {coach?.name}</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                退出
              </Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={coach?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{coach?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold">{coach?.name}</h2>
                    <p className="mt-1 text-muted-foreground">
                      {coach?.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{coach?.rating}</span>
                        <span className="text-gray-500">
                          ({coach?.reviews}条评价)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary">{coach?.experience} 经验</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="grid gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">1. 选择预约日期</h3>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setSelectedTime(null)
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setDate(new Date().getDate() - 1))
                      }
                      className="rounded-md border"
                      locale={zhCN}
                    />
                  </div>

                  {selectedDate && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">2. 选择时间</h3>
                        <p className="text-muted-foreground">
                          {selectedDate.toLocaleDateString("zh-CN", {
                            month: "long",
                            day: "numeric",
                          })}
                          {" 可用时间"}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedTime && selectedDate && (
                  <>
                    <Separator className="my-8" />
                    <div className="rounded-lg border bg-emerald-50 p-6 text-center">
                      <p className="text-lg font-medium text-gray-800">
                        您已选择:{" "}
                        <span className="font-semibold text-emerald-700">
                          {selectedDate.toLocaleDateString("zh-CN")}{" "}
                          {selectedTime}
                        </span>
                      </p>
                      <Button
                        size="lg"
                        className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      >
                        确认并预约
                      </Button>
                    </div>
                  </>
                )}

                <Separator className="my-8" />

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    预约须知
                  </h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    <li>每次咨询时长为30分钟</li>
                    <li>预约后教练会在24小时内确认</li>
                    <li>可在咨询前2小时免费取消</li>
                    <li>建议提前准备好咨询问题</li>
                    <li>内部免费咨询服务</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">学员中心</h1>
          <div className="flex items-center space-x-4">
            <Link href="/student/bookings">
              <Button variant="outline" size="sm" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                我的预约
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                退出
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索教练姓名或专长领域..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="选择专长领域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部领域</SelectItem>
                <SelectItem value="电商运营">电商运营</SelectItem>
                <SelectItem value="社群营销">社群营销</SelectItem>
                <SelectItem value="投资理财">投资理财</SelectItem>
                <SelectItem value="短视频制作">短视频制作</SelectItem>
                <SelectItem value="直播带货">直播带货</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Coach List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <Card key={coach.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={coach.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{coach.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <CardDescription>{coach.experience} 经验</CardDescription>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{coach.rating}</span>
                      <span className="text-sm text-gray-500">({coach.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {coach.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-teal-100 text-teal-800 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{coach.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedCoach(coach.id)}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      预约
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的教练</h3>
            <p className="text-gray-600">请尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </div>
    </div>
  )
}
