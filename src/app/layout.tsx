import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ryan Bartelme - Computational Biologist & Data Scientist',
  description: 'Bioinformatics research, data science insights, and computational biology from Dr. Ryan Bartelme.',
  keywords: ['bioinformatics', 'data science', 'computational biology', 'agriculture', 'microbial ecology'],
  authors: [{ name: 'Ryan Bartelme' }],
  creator: 'Ryan Bartelme',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rbartelme.github.io',
    siteName: 'Ryan Bartelme',
    title: 'Ryan Bartelme - Computational Biologist & Data Scientist',
    description: 'Bioinformatics research, data science insights, and computational biology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Bartelme - Computational Biologist & Data Scientist',
    description: 'Bioinformatics research, data science insights, and computational biology.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}