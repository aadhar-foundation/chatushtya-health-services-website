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
  metadataBase: new URL('https://chatushtya-health-services.com'),
  title: 'CHS - Chatushtya Health Services LLP | Healthcare Capacity Building',
  description: 'Unlock your full potential with CHS. We specialize in healthcare capacity building, training, and digital transformation for healthcare professionals and institutions worldwide. Expert mentorship, clinical training, quality improvement, and global employability.',
  keywords: [
    'healthcare training',
    'capacity building',
    'medical education',
    'nursing training',
    'healthcare consultancy',
    'NCLEX preparation',
    'NHS placements',
    'clinical training',
    'healthcare professionals',
    'quality improvement',
    'healthcare institutions',
    'India healthcare',
    'medical consultancy',
    'nursing staff training',
    'paramedical training',
    'digital health transformation',
    'ABDM implementation',
    'healthcare capacity',
    'clinical excellence',
    'professional development'
  ],
  authors: [{ name: 'Chatushtya Health Services LLP' }],
  creator: 'Chatushtya Health Services LLP',
  publisher: 'Chatushtya Health Services LLP',
  category: 'Healthcare',
  classification: 'Healthcare Consulting',
  robots: 'index, follow',
  referrer: 'strict-origin-when-cross-origin',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://chatushtya-health-services.com',
    siteName: 'Chatushtya Health Services LLP',
    title: 'CHS - Healthcare Capacity Building | Your Outcome – Our Expertise',
    description: 'Empowering healthcare professionals and institutions with training, certification, and digital transformation solutions.',
    images: [
      {
        url: '/images/logo.svg',
        width: 1200,
        height: 630,
        alt: 'CHS - Chatushtya Health Services LLP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHS - Healthcare Capacity Building | Chatushtya Health Services',
    description: 'Capacity building services for healthcare professionals. Expert training, quality improvement, and digital health solutions.',
    creator: '@CHS_Healthcare',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/images/logo.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/logo.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/logo.svg',
        color: '#193358',
      },
      {
        rel: 'shortcut icon',
        url: '/images/logo.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#193358' },
    { media: '(prefers-color-scheme: dark)', color: '#193358' },
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
        <meta name="apple-mobile-web-app-title" content="CHS" />
        <meta name="application-name" content="CHS" />
        <meta name="msapplication-TileColor" content="#193358" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Explicit favicon declarations for browser tabs */}
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/images/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={`${poppins.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
