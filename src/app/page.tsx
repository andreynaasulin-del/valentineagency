'use client'

import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { EarningsShowcase } from '@/components/earnings-showcase'
import { ReferralProgram } from '@/components/referral-program'
import { LeadForm } from '@/components/lead-form'
import { FAQ } from '@/components/faq'
import { AiAssistant } from '@/components/ai-assistant'
import { LiveActivity } from '@/components/live-activity'
import { StickyCtaBar } from '@/components/sticky-cta-bar'
import { useLanguage } from '@/context/language-context'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-cream-50 relative">
      <div className="relative z-10 flex flex-col">
        {/* HERO - First impression */}
        <Hero />

        {/* FEATURES - Why us */}
        <Features />

        {/* HOW IT WORKS - Schedule + Steps */}
        <HowItWorks />

        {/* EARNINGS - Social proof */}
        <EarningsShowcase />

        {/* REFERRAL - Extra motivation */}
        <ReferralProgram />

        {/* LEAD FORM & CALCULATOR - The Core Action */}
        <section
          id="leads-form"
          className="w-full max-w-4xl mx-auto px-5 sm:px-8"
        >
          <LeadForm />
        </section>

        {/* FAQ SECTION */}
        <FAQ />

        {/* Footer */}
        <footer className="py-16 border-t border-cream-200 mt-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="font-serif italic text-xl text-brown-950">Valentine Agency</p>
              <p className="text-xs text-brown-400">{t('footer.tagline')}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-brown-400">
              <a href="#leads-form" className="hover:text-rose-500 transition-colors">{t('footer.form')}</a>
              <span className="w-1 h-1 rounded-full bg-brown-200" />
              <a href="https://t.me/" className="hover:text-rose-500 transition-colors">Telegram</a>
            </div>
            <p className="text-[10px] text-brown-300 uppercase tracking-[0.3em] font-bold">
              &copy; {new Date().getFullYear()} Valentine Agency
            </p>
          </div>
        </footer>
      </div>

      {/* Fixed overlays */}
      <AiAssistant />
      <LiveActivity />
      <StickyCtaBar />
    </main>
  )
}
