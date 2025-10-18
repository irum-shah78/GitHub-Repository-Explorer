import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Issue Tracker - Refactored',
  description: 'A refactored issue tracking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
