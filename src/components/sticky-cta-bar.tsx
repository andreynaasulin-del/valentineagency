'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

export const StickyCtaBar = () => {
    const [visible, setVisible] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 600)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-cream-200 shadow-luxury py-3 px-4 sm:py-4 sm:px-6 md:hidden"
                >
                    <a
                        href="#leads-form"
                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-rose-500 to-rose-400 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-btn-hover active:scale-95 transition-transform"
                    >
                        <Sparkles className="w-4 h-4" />
                        {t('stickyCta')}
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
