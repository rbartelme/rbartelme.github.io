import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 Ryan Bartelme. Bioinformatic Scientist at Pivot Bio.</p>
            <p className="text-sm">
              Exploring sustainable solutions for agricultural, medical, and environmental big data challenges.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}