import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理员后台</CardTitle>
          <CardDescription>此页面仅对管理员可见。</CardDescription>
        </CardHeader>
        <CardContent>
          <p>这里是管理员专属的内容区域。</p>
        </CardContent>
      </Card>
    </div>
  );
}
