import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { LanguageProvider } from '@/context/language-context'
import { LanguageSelector } from '@/components/language-selector'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Valentine Agency - Стань частью команды',
  description: 'Онлайн-оператор чата. Свободный график, стабильный доход от 4000₽ за смену, обучение с нуля за 3 дня',
  openGraph: {
    title: 'Valentine Agency - Стань частью команды',
    description: 'Онлайн-оператор чата. Свободный график, стабильный доход от 4000₽ за смену',
    type: 'website',
    locale: 'ru_RU',
    images: ['/hero-bg-v2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valentine Agency - Стань частью команды',
    description: 'Онлайн-оператор чата. Свободный график, стабильный доход от 4000₽ за смену',
    images: ['/hero-bg-v2.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={cn('min-h-screen font-sans', inter.variable, playfair.variable)}>
        <LanguageProvider>
          <LanguageSelector />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
