import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// 在真实的应用中，我们会从数据库导入相应的模型
// import { db } from '@/lib/db'; 
// import { coachAvailabilities } from '@/lib/db/schema';

/**
 * @description 处理更新教练可预约时间的 POST 请求
 */
export async function POST(request: Request) {
  const session = await auth();

  // 1. 验证用户身份
  if (!session?.user || (session.user as any).role !== 'coach') {
    return NextResponse.json({ error: '未经授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { schedule, bufferTime } = body;

    // 2. 验证输入数据 (这是一个基础的验证)
    if (!schedule || typeof bufferTime !== 'number') {
      return NextResponse.json({ error: '无效的输入数据' }, { status: 400 });
    }

    const coachId = session.user.id;

    // 3. 在这里执行数据库操作
    // 例如:
    // await db.insert(coachAvailabilities).values({
    //   coachId: coachId,
    //   schedule: schedule, // schedule 可能是 JSON 类型
    //   bufferTime: bufferTime,
    // }).onConflict('coachId', doUpdate()); // 如果存在则更新

    console.log('API Route received data:');
    console.log('Coach ID:', coachId);
    console.log('Schedule:', schedule);
    console.log('Buffer Time:', bufferTime);

    // 4. 返回成功响应
    return NextResponse.json(
      { message: '可用时间已成功更新' },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新可用时间失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 