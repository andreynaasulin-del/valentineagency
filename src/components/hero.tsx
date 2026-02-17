'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Heart, Users, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'

export const Hero = () => {
    const { t } = useLanguage()

    return (
        <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/hero-bg-v2.png"
                    alt="Premium Background"
                    fill
                    priority
                    quality={75}
                    className="object-cover object-center brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-cream-50/90 via-cream-50/50 to-cream-50" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center gap-8 sm:gap-10">
                {/* Badge — dark bg for contrast */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-brown-950/80 backdrop-blur-xl border border-brown-800/50 text-white text-[11px] font-bold tracking-[0.3em] uppercase shadow-2xl"
                >
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    {t('hero.badge')}
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col gap-2"
                >
                    <h1 className="display-title text-[clamp(3rem,12vw,8rem)] leading-[0.85] tracking-tighter text-brown-950 font-serif">
                        Valentine
                    </h1>
                    <span className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-rose-600 tracking-tight mt-3">
                        {t('hero.agency')}
                    </span>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-xl"
                >
                    <p className="text-base sm:text-lg md:text-xl text-brown-700 leading-relaxed font-light">
                        {t('hero.description')}
                    </p>
                </motion.div>

                {/* CTA Button — gradient for visibility */}
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    href="#leads-form"
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase shadow-btn-hover hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
                >
                    <span className="relative z-10 leading-none">{t('hero.cta')}</span>
                </motion.a>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2"
                >
                    <div className="flex items-center gap-2 text-sm text-brown-500">
                        <Users className="w-4 h-4 text-rose-400" />
                        <span><strong className="text-brown-700">500+</strong> операторов в команде</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-brown-300" />
                    <div className="flex items-center gap-2 text-sm text-brown-500">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Выплаты <strong className="text-brown-700">каждый понедельник</strong></span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator — proper animation */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ArrowDown className="w-5 h-5 text-brown-400/50" />
            </motion.div>
        </section>
    )
}
