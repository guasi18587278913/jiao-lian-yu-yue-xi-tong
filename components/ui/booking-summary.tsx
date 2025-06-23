'use client'

import React from 'react'
import { format } from 'date-fns'
import { useBookingStore } from '@/lib/store/booking-store'
import type { Slot } from '@/lib/types'

// --- Component Definition ---
export const BookingSummary = () => {
  const { date, slot, setSlot } = useBookingStore();
  const tz = `UTC${format(new Date(), 'XXX')}`

  // Render only when a date and slot are selected
  if (!date || !slot) {
    return null;
  }

  const handleModify = () => {
    setSlot(null); // Keep date, just reset slot
  };

  return (
    <div className="w-full">
      <h3 className="mb-2 text-sm font-semibold text-brand">已选预约</h3>
      <p className="text-lg font-medium">
        {format(date, 'yyyy-MM-dd')} · {slot.time}
        <span className="ml-2 text-xs text-gray-500">({tz})</span>
      </p>

      <p className="mt-2 text-xs text-gray-500">
        取消规则：开始前 12 小时内不可取消
      </p>

      <div className="mt-4 flex gap-4">
        {/* The main "Reset" button is now the "Confirm" button's responsibility after booking */}
        <button 
          onClick={handleModify} 
          className="text-sm text-gray-600 hover:underline"
        >
          修改时段
        </button>
      </div>
    </div>
  );
}; 