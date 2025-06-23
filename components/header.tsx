import Image from 'next/image'
import Link from 'next/link'
import { RoleSwitcher } from './role-switcher'

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="生财有术 Logo"
            width={140}
            height={35}
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          <RoleSwitcher />
        </div>
      </div>
    </header>
  )
} 