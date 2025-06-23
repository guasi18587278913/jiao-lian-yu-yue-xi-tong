'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Do not render the button on the homepage
  if (pathname === '/') {
    return null
  }

  const handleSwitchRole = () => {
    localStorage.removeItem('lastRole')
    router.push('/')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSwitchRole}
      className="text-gray-600 hover:text-gray-900"
    >
      <LogOut className="mr-2 h-4 w-4" />
      切换角色
    </Button>
  )
} 