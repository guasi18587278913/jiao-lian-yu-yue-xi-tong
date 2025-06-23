'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type Role = 'student' | 'coach' | 'admin'

function isValidRole(role: string | null): role is Role {
  return role === 'student' || role === 'coach' || role === 'admin'
}

export function HomePageClient() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState<Role | null>(null)

  useEffect(() => {
    const lastRole = localStorage.getItem('lastRole')
    if (isValidRole(lastRole)) {
      // Don't show anything, just redirect. The page will flicker,
      // but adding a loader here makes the UI jumpy.
      // The redirection is usually fast enough.
      router.push(`/${lastRole}`)
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleRoleSelect = (role: Role) => {
    setIsNavigating(role)
    localStorage.setItem('lastRole', role)
    router.push(`/${role}`)
  }

  // Render a loader while checking for the role to prevent flicker
  if (isLoading) {
    return (
      <div className="flex h-[104px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 justify-center">
      <Button
        size="lg"
        onClick={() => handleRoleSelect('student')}
        disabled={!!isNavigating}
        className="w-full sm:w-auto text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-transform hover:scale-105"
      >
        {isNavigating === 'student' ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : null}
        我是学员，立即预约
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => handleRoleSelect('coach')}
        disabled={!!isNavigating}
        className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-amber-400 text-amber-500 hover:bg-amber-50 hover:text-amber-600 transition-transform hover:scale-105"
      >
        {isNavigating === 'coach' ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : null}
        我是教练
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => handleRoleSelect('admin')}
        disabled={!!isNavigating}
        className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-transform hover:scale-105"
      >
        {isNavigating === 'admin' ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : null}
        我是管理员
      </Button>
    </div>
  )
} 