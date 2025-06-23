'use client'

import React, { useMemo } from 'react'
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
  isBefore,
  startOfToday,
  isAfter,
} from 'date-fns'
import { getMonthMatrix } from '@/lib/calendar-utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/lib/store/booking-store'

// --- Calendar Component ---
interface BookingCalendarProps {
  minDate?: Date;
  maxDate?: Date;
}

export function BookingCalendar({ 
  minDate,
  maxDate
}: BookingCalendarProps) {
  const { 
    currentMonth, 
    setCurrentMonth, 
    date: selectedDate, 
    setDate: onDateSelect 
  } = useBookingStore();

  const monthMatrix = useMemo(() => getMonthMatrix(currentMonth), [currentMonth]);
  const today = startOfToday();

  const effectiveMinDate = minDate || today;
  const effectiveMaxDate = maxDate || addMonths(today, 3); // Default to 3 months ahead if not provided

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="p-4 md:p-6">
      <CalendarHeader 
        currentMonth={currentMonth}
        onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
        onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
      />
      <div className="grid grid-cols-7 gap-2 mt-4">
        {weekDays.map(day => <div key={day} className="text-center text-sm font-medium text-neutral-400">{day}</div>)}
        {monthMatrix.map((day, index) => (
          <DayCell 
            key={index}
            day={day}
            today={today}
            minDate={effectiveMinDate}
            maxDate={effectiveMaxDate}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        ))}
      </div>
    </div>
  );
}

// --- Calendar Sub-components ---
function CalendarHeader({ currentMonth, onNextMonth, onPrevMonth }: any) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={onPrevMonth} aria-label="上个月">
        <ChevronLeft className="h-5 w-5 text-neutral-700" />
      </Button>
      <h2 className="font-semibold text-neutral-700">{format(currentMonth, 'yyyy年 M月')}</h2>
      <Button variant="ghost" size="icon" onClick={onNextMonth} aria-label="下个月">
        <ChevronRight className="h-5 w-5 text-neutral-700" />
      </Button>
    </div>
  );
}

interface DayCellProps {
  day: Date | null;
  today: Date;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

function DayCell({ day, today, minDate, maxDate, selectedDate, onDateSelect }: DayCellProps) {
  if (!day) {
    return <div />;
  }

  const isSelectable = isAfter(day, minDate) && isBefore(day, maxDate);

  return (
    <div
      className={clsx(
        'flex items-center justify-center h-10 w-10 rounded-full transition-colors duration-200',
        isSelectable ? 'cursor-pointer' : 'text-neutral-400 cursor-not-allowed',
        !isSelectable && isToday(day) && 'text-neutral-500 font-semibold',
        isSelectable && isToday(day) && 'bg-neutral-100',
        isSelectable && !isToday(day) && 'hover:bg-neutral-100',
        isSameDay(day, selectedDate || new Date(0)) && 'bg-brand text-white hover:bg-brand-hover'
      )}
      onClick={() => isSelectable && onDateSelect(day)}
    >
      {format(day, 'd')}
    </div>
  );
} 