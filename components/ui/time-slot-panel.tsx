'use client'

import React from 'react'
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useBookingStore } from '@/lib/store/booking-store'
import type { Status, Slot } from '@/lib/types'
import { format } from 'date-fns'

// --- Time Slot Panel Component ---
export function TimeSlotPanel() {
  const { status, slots, slot: selectedSlot, setSlot: onSlotSelect, reset, date } = useBookingStore();
  const timezoneOffset = `UTC${format(new Date(), 'XXX')}`

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <SkeletonGrid />;
      case 'success':
        return <TimeSlotGrid slots={slots} selectedSlot={selectedSlot} onSlotSelect={onSlotSelect} />;
      case 'error':
        return <ErrorMessage />;
      case 'confirmed':
        return <BookingSuccessMessage onReset={reset} date={date} slot={selectedSlot} />;
      case 'idle':
      default:
        return <IdleMessage />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 p-6 border-l border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-neutral-800">选择预约时段</div>
        <div className="text-xs font-mono text-neutral-400 bg-neutral-200 px-2 py-1 rounded">
          {timezoneOffset}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

// --- Child Components ---
function TimeSlotGrid({ slots, selectedSlot, onSlotSelect }: { slots: Slot[], selectedSlot: Slot | null, onSlotSelect: (slot: Slot) => void }) {
  if (slots.length === 0) {
    return <div className="text-center text-neutral-500 mt-8">当日已无可选时段</div>;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const availableSlots = slots.filter(s => s.available);
    if(availableSlots.length === 0) return;

    const currentSlotIndex = availableSlots.findIndex(s => s.time === e.currentTarget.innerText);
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentSlotIndex + 1) % availableSlots.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentSlotIndex - 1 + availableSlots.length) % availableSlots.length;
        break;
      case 'Enter':
      case ' ':
        onSlotSelect(availableSlots[currentSlotIndex]);
        return;
      default:
        return;
    }

    const nextSlotTime = availableSlots[nextIndex].time;
    const nextSlotButton = e.currentTarget.parentElement?.querySelector(`button[data-time="${nextSlotTime}"]`) as HTMLButtonElement | null;
    nextSlotButton?.focus();
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((slot, index) => (
        <button
          key={slot.time}
          data-time={slot.time}
          disabled={!slot.available}
          onClick={() => onSlotSelect(slot)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          aria-label={slot.available ? `预约时间 ${slot.time}`: `时间 ${slot.time} 不可用`}
          aria-disabled={!slot.available}
          className={clsx(
            'w-full p-3 text-center rounded-md transition-all duration-200 border',
            {
              // --- Base Styles ---
              'text-neutral-800 bg-white border-neutral-300': slot.available,
              'text-neutral-400 bg-neutral-100 border-neutral-200 cursor-not-allowed': !slot.available,
              // --- Hover Styles (for available slots) ---
              'hover:border-brand/60 hover:bg-brand/5': slot.available,
              // --- Selected Styles ---
              'bg-brand text-white border-brand shadow-md': slot.available && selectedSlot?.time === slot.time,
            }
          )}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}

function IdleMessage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400">
      <CalendarIcon className="h-12 w-12 mb-4" />
      <p className="font-medium">请先在左侧选择日期</p>
      <p className="text-sm">选择后将显示可用时间段</p>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-red-500">
      <p className="font-medium">加载可用时间失败</p>
      <Button variant="link" onClick={() => window.location.reload()}>请重试</Button>
    </div>
  );
}

function BookingSuccessMessage({ onReset, date, slot }: { onReset: () => void; date: Date | null; slot: Slot | null }) {
  if (!date || !slot) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold text-neutral-800">预订成功</h3>
      <div className="bg-emerald-50 text-brand font-semibold p-3 rounded-lg my-4">
        {format(date, 'yyyy年M月d日')} · {slot.time}
      </div>
      <button
        onClick={onReset}
        className="mt-4 text-brand font-semibold hover:underline"
      >
        预约其他时段
      </button>
    </div>
  )
} 