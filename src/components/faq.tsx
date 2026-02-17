'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

export const FAQ = () => {
    const { t } = useLanguage()
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const items = t('faq.items')

    return (
        <section className="relative py-16 sm:py-20 max-w-5xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col items-center mb-12 text-center">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brown-900 leading-tight tracking-tight">
                    {t('faq.title')}
                </h2>
            </div>

            <div className="flex flex-col border-t border-cream-200">
                {items.map((faq: any, i: number) => (
                    <div key={i} className="border-b border-cream-200">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full py-6 sm:py-8 flex items-center justify-between text-left gap-4 group transition-all"
                        >
                            <span className="font-serif text-lg sm:text-xl md:text-2xl text-brown-900 group-hover:text-rose-500 transition-colors leading-snug">
                                {faq.q}
                            </span>
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                {openIndex === i
                                    ? <Minus className="w-5 h-5 text-rose-500" strokeWidth={1.5} />
                                    : <Plus className="w-5 h-5 text-brown-400 group-hover:text-rose-400" strokeWidth={1.5} />
                                }
                            </div>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <div className="pb-6 sm:pb-8 text-base sm:text-lg text-brown-600 leading-relaxed font-serif italic">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    )
}
