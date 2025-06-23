'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const daysOfWeek = [
  { id: 'monday', label: '星期一' },
  { id: 'tuesday', label: '星期二' },
  { id: 'wednesday', label: '星期三' },
  { id: 'thursday', label: '星期四' },
  { id: 'friday', label: '星期五' },
  { id: 'saturday', label: '星期六' },
  { id: 'sunday', label: '星期日' },
];

export default function CoachAvailabilityPage() {
  // 初始状态，周一至周五 9-17 点
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' },
    sunday: { enabled: false, start: '09:00', end: '17:00' },
  });

  const [bufferTime, setBufferTime] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleDayToggle = (dayId: keyof typeof schedule) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], enabled: !prev[dayId].enabled },
    }));
  };

  const handleTimeChange = (
    dayId: keyof typeof schedule,
    timeType: 'start' | 'end',
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], [timeType]: value },
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/coach/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedule, bufferTime }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '更新失败');
      }

      toast.success('成功', {
        description: '您的可预约时间已成功更新。',
      });
    } catch (error) {
      toast.error('错误', {
        description: error instanceof Error ? error.message : '发生未知错误',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">设置您的可预约时间</CardTitle>
          <CardDescription>
            定义学员可以预约您的时间段，并设置课间缓冲。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">每周排班模板</h3>
            <div className="rounded-md border p-4 space-y-4">
              {daysOfWeek.map(({ id, label }) => {
                const dayKey = id as keyof typeof schedule;
                const daySettings = schedule[dayKey];
                return (
                  <div key={id} className="flex items-center gap-4">
                    <div className="w-24">
                      <Checkbox
                        id={`check-${id}`}
                        checked={daySettings.enabled}
                        onCheckedChange={() => handleDayToggle(dayKey)}
                      />
                      <Label htmlFor={`check-${id}`} className="ml-2">
                        {label}
                      </Label>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        type="time"
                        value={daySettings.start}
                        onChange={(e) =>
                          handleTimeChange(dayKey, 'start', e.target.value)
                        }
                        disabled={!daySettings.enabled}
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        value={daySettings.end}
                        onChange={(e) =>
                          handleTimeChange(dayKey, 'end', e.target.value)
                        }
                        disabled={!daySettings.enabled}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">预约设置</h3>
            <div className="flex items-center gap-4">
              <Label htmlFor="buffer-time" className="w-32">
                课间缓冲时间
              </Label>
              <Input
                id="buffer-time"
                type="number"
                min="0"
                className="w-24"
                value={bufferTime}
                onChange={(e) => setBufferTime(parseInt(e.target.value, 10))}
              />
              <span>分钟</span>
            </div>
            <p className="text-sm text-muted-foreground">
              每次预约结束后，将自动留出这段时间作为缓冲，不可被预约。
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '保存中...' : '保存设置'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 