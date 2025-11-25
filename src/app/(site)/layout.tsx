import type { Metadata } from 'next'
import { Bungee, Poppins } from 'next/font/google'
import './globals.css'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
// import { useDraftOverlay } from '@/sanity.config'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bungee',
  display: 'swap',
})

const siteUrl = 'https://campusclimatenetwork.org'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Campus Climate Network',
  description:
    'Campus Climate Network organizes students to win fossil-free research and climate justice on campus.',
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Campus Climate Network',
    title: 'Campus Climate Network',
    description:
      'Campus Climate Network organizes students to win fossil-free research and climate justice on campus.',
    images: [
      {
        url: '/photoprotest.jpg',
        width: 1200,
        height: 630,
        alt: 'Campus Climate Network organizers rallying for climate justice.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Climate Network',
    description:
      'Students organizing for fossil-free research and climate justice.',
    images: ['/photoprotest.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const { isEnabled } = draftMode()

  return (
    <html
      lang="en"
      // data-sanity-drafts={useDraftOverlay && isEnabled ? 'true' : 'false'}
    >
      <body
        className={`${poppins.variable} ${bungee.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
