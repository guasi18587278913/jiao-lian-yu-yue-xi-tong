'use client'

import React from 'react'
import Confetti from 'react-confetti'
import { CheckCircle2 } from 'lucide-react'
import { Button } from './button'
import { useBookingStore } from '@/lib/store/booking-store'
import { useWindowSize } from 'react-use'

export function BookingSuccess() {
  const reset = useBookingStore(s => s.reset)
  const { width, height } = useWindowSize()

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-lg relative overflow-hidden">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.1}
      />
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold text-neutral-800 mb-2">预约成功！</h2>
      <p className="text-neutral-500 mb-6">我们已经收到您的预约，请留意后续通知。</p>
      <Button onClick={() => {
        const resetAction = useBookingStore.getState().reset;
        resetAction();
      }}>再约一次</Button>
    </div>
  )
} 