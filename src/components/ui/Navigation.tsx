'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              Ryan Bartelme
            </Link>
            <span className="ml-3 text-sm text-gray-500">Computational Biologist & Data Scientist</span>
          </div>
          <div className="flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <Link 
                key={href}
                href={href}
                className={`transition-colors ${
                  pathname === href 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}