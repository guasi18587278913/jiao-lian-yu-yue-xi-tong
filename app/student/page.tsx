"use client"

import React, { useEffect } from 'react'
import { BookingCalendar } from '@/components/ui/booking-calendar'
import { TimeSlotPanel } from '@/components/ui/time-slot-panel'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/lib/store/booking-store'
import type { Slot } from '@/lib/types'
import { BookingSuccess } from '@/components/ui/booking-success'
import { BookingSummary } from '@/components/ui/booking-summary'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// --- Main Page Component ---
export default function StudentBookingPage() {
  const { 
    date, 
    slot, 
    status,
    setSlots, 
    setStatus,
  } = useBookingStore();

  // --- Data Fetching Effect ---
  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    
    const fetchSlots = async () => {
      setStatus('loading');
      try {
        // 将日期格式化为 YYYY-MM-DD
        const dateString = date.toISOString().split('T')[0];
        const response = await fetch(`/api/availability/slots?date=${dateString}`);
        
        if (!response.ok) {
          throw new Error('获取可用时间失败');
        }
        
        const data = await response.json();
        setSlots(data.slots || []);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    fetchSlots();
  }, [date, setSlots, setStatus]);

  // --- Event Handlers ---
  const handleBookingConfirm = () => {
    if (!date || !slot) return;
    setStatus('confirmed');
  }

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-theme(space.24))]">
        <div className="w-full max-w-5xl">
          {status === 'confirmed' ? (
            <BookingSuccess />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-[500px_1fr] bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200/50">
                <BookingCalendar />
                <div className="flex flex-col bg-neutral-50">
                  <TimeSlotPanel />
                  <div className="p-6 border-t border-gray-200 mt-auto bg-white">
                    <Button 
                      size="lg" 
                      className="w-full bg-brand hover:bg-brand-hover text-lg disabled:bg-brand/25"
                      disabled={!date || !slot}
                      onClick={handleBookingConfirm}
                    >
                      确认预约
                    </Button>
                  </div>
                </div>
              </div>

              {/* Booking Summary Section, rendered conditionally below the main card */}
              {date && slot && (
                <>
                  {/* Mobile Accordion */}
                  <div className="md:hidden mt-4">
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full bg-white rounded-lg shadow-sm border border-neutral-200/50 px-4">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger>已选详情</AccordionTrigger>
                        <AccordionContent>
                          <BookingSummary />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Desktop static summary card */}
                  <div className="hidden md:block mt-6 rounded-lg border p-4 shadow-sm bg-white border-neutral-200/50">
                    <BookingSummary />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
