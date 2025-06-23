import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoachPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>教练后台</CardTitle>
          <CardDescription>此页面仅对教练可见。</CardDescription>
        </CardHeader>
        <CardContent>
          <p>这里是教练专属的内容区域。</p>
        </CardContent>
      </Card>
    </div>
  );
}
