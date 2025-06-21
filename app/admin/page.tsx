"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  Search,
  Filter,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock data for admin dashboard
const stats = {
  totalUsers: 11000,
  totalCoaches: 1000,
  totalStudents: 10000,
  totalBookings: 50000,
  monthlyBookings: 4200,
  satisfaction: "98%",
  activeBookings: 156,
}

const recentBookings = [
  {
    id: 1,
    student: "李同学",
    coach: "张教练",
    time: "2024-01-15 14:00",
    status: "confirmed",
    topic: "电商运营",
  },
  {
    id: 2,
    student: "王同学",
    coach: "李老师",
    time: "2024-01-15 16:00",
    status: "pending",
    topic: "投资理财",
  },
  {
    id: 3,
    student: "赵同学",
    coach: "王导师",
    time: "2024-01-16 10:00",
    status: "completed",
    topic: "短视频制作",
  },
]

const users = [
  {
    id: 1,
    name: "张教练",
    email: "zhang@example.com",
    role: "coach",
    status: "active",
    joinDate: "2023-06-15",
    bookings: 128,
  },
  {
    id: 2,
    name: "李同学",
    email: "li@example.com",
    role: "student",
    status: "active",
    joinDate: "2023-08-20",
    bookings: 15,
  },
  {
    id: 3,
    name: "王老师",
    email: "wang@example.com",
    role: "coach",
    status: "inactive",
    joinDate: "2023-05-10",
    bookings: 95,
  },
]

const conflicts = [
  {
    id: 1,
    description: "张教练同一时间段有多个预约请求",
    time: "2024-01-15 14:00",
    severity: "high",
    status: "pending",
  },
  {
    id: 2,
    description: "系统检测到异常预约行为",
    time: "2024-01-15 16:00",
    severity: "medium",
    status: "investigating",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")

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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "coach":
        return <Badge className="bg-blue-100 text-blue-800">教练</Badge>
      case "student":
        return <Badge className="bg-green-100 text-green-800">学员</Badge>
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">管理员</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = userFilter === "all" || user.role === userFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">管理员中心</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              系统设置
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="users">用户管理</TabsTrigger>
            <TabsTrigger value="bookings">预约管理</TabsTrigger>
            <TabsTrigger value="conflicts">冲突处理</TabsTrigger>
            <TabsTrigger value="reports">数据报表</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总用户数</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    教练 {stats.totalCoaches} | 学员 {stats.totalStudents}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总预约数</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">本月 {stats.monthlyBookings}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">满意度</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.satisfaction}</div>
                  <p className="text-xs text-muted-foreground">用户满意度</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">活跃预约</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeBookings}</div>
                  <p className="text-xs text-muted-foreground">进行中的咨询</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>最近预约</CardTitle>
                  <CardDescription>系统中的最新预约活动</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">
                            {booking.student} → {booking.coach}
                          </div>
                          <div className="text-sm text-gray-600">{booking.time}</div>
                          <div className="text-sm text-gray-500">{booking.topic}</div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>系统警告</CardTitle>
                  <CardDescription>需要关注的系统问题</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conflicts.map((conflict) => (
                      <div key={conflict.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-yellow-50">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{conflict.description}</div>
                          <div className="text-xs text-gray-600 mt-1">{conflict.time}</div>
                        </div>
                        <Badge variant={conflict.severity === "high" ? "destructive" : "secondary"}>
                          {conflict.severity === "high" ? "高" : "中"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户管理</CardTitle>
                <CardDescription>管理平台上的所有用户账户</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索用户姓名或邮箱..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="筛选用户类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部用户</SelectItem>
                      <SelectItem value="coach">教练</SelectItem>
                      <SelectItem value="student">学员</SelectItem>
                      <SelectItem value="admin">管理员</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-medium">{user.name}</div>
                          {getRoleBadge(user.role)}
                          {user.status === "active" ? (
                            <Badge className="bg-green-100 text-green-800">
                              <UserCheck className="w-3 h-3 mr-1" />
                              活跃
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              <UserX className="w-3 h-3 mr-1" />
                              非活跃
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-sm text-gray-500">
                          加入时间: {user.joinDate} | 预约数: {user.bookings}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          {user.status === "active" ? "禁用" : "启用"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>预约管理</CardTitle>
                <CardDescription>查看和管理所有预约记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-medium">#{booking.id}</div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {booking.student} 预约 {booking.coach}
                        </div>
                        <div className="text-sm text-gray-500">
                          时间: {booking.time} | 主题: {booking.topic}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          查看详情
                        </Button>
                        {booking.status === "pending" && <Button size="sm">处理</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conflicts Tab */}
          <TabsContent value="conflicts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>冲突处理</CardTitle>
                <CardDescription>处理预约冲突和系统异常</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conflicts.map((conflict) => (
                    <div key={conflict.id} className="p-4 border rounded-lg bg-yellow-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <div className="font-medium">冲突 #{conflict.id}</div>
                          <Badge variant={conflict.severity === "high" ? "destructive" : "secondary"}>
                            {conflict.severity === "high" ? "高优先级" : "中优先级"}
                          </Badge>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">
                          {conflict.status === "pending" ? "待处理" : "处理中"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">{conflict.description}</div>
                      <div className="text-sm text-gray-500 mb-3">发生时间: {conflict.time}</div>
                      <div className="flex space-x-2">
                        <Button size="sm">立即处理</Button>
                        <Button size="sm" variant="outline">
                          分配给专员
                        </Button>
                        <Button size="sm" variant="outline">
                          标记已解决
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>预约统计</CardTitle>
                  <CardDescription>预约数据趋势分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">本月预约总数</div>
                        <div className="text-sm text-gray-600">较上月增长 12%</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{stats.monthlyBookings}</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">预约成功率</div>
                        <div className="text-sm text-gray-600">教练确认率</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">89%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium">平均评分</div>
                        <div className="text-sm text-gray-600">用户满意度</div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">4.8</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>团队效率</CardTitle>
                  <CardDescription>内部咨询服务数据分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">本月咨询</div>
                        <div className="text-sm text-gray-600">完成咨询次数</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">156</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">问题解决率</div>
                        <div className="text-sm text-gray-600">成功解决问题比例</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium">响应速度</div>
                        <div className="text-sm text-gray-600">平均响应时间</div>
                      </div>
                      <div className="flex items-center text-orange-600">
                        <Clock className="w-5 h-5 mr-1" />
                        <span className="text-2xl font-bold">2小时</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>导出报表</CardTitle>
                <CardDescription>生成详细的数据报表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span>用户统计报表</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span>预约数据报表</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Users className="w-6 h-6 mb-2" />
                    <span>团队效率报表</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
