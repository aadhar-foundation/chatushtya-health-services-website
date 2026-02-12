import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'CHS - Chatushtya Health Services LLP | Healthcare Capacity Building',
  description: 'Unlock your full potential with CHS. We specialize in healthcare capacity building, training, and digital transformation for healthcare professionals and institutions worldwide.',
  keywords: ['healthcare training', 'capacity building', 'medical education', 'nursing training', 'healthcare consultancy', 'NCLEX', 'NHS', 'India'],
  authors: [{ name: 'Chatushtya Health Services LLP' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://chatushtya-health-services.com',
    siteName: 'Chatushtya Health Services LLP',
    title: 'CHS - Healthcare Capacity Building | Your Outcome – Our Expertise',
    description: 'Empowering healthcare professionals and institutions with training, certification, and digital transformation solutions.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CHS - Chatushtya Health Services LLP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHS - Healthcare Capacity Building',
    description: 'Unlock your full potential with Chatushtya Health Services',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E40AF' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${poppins.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
