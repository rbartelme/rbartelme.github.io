import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-600 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-200">
            <p className="mb-2">© {currentYear} Ryan Bartelme. Founder of Informatic Edge, LLC.</p>
            <p className="text-sm">
              Full-stack data scientist specializing in bioinformatics and computational biology.
            </p>
            <p className="text-sm mt-2">
              <a
                href="/feed.xml"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                RSS Feed
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}