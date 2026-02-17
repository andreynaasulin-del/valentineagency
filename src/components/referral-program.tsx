'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Gift, ArrowRight, Star } from 'lucide-react'

export const ReferralProgram = () => {
    return (
        <section className="relative py-16 max-w-5xl mx-auto px-6 sm:px-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne-100 opacity-20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-12">
                {/* Header */}
                <div className="text-center max-w-xl">
                    <div className="inline-flex items-center gap-2 mb-5">
                        <Users className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span className="label-text text-rose-400 uppercase tracking-[0.15em] text-[10px] font-bold">Партнерство</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brown-900 leading-tight tracking-tight mb-4">
                        Зарабатывай <span className="gradient-text italic">вместе</span> с нами
                    </h2>
                    <p className="text-brown-500 text-sm sm:text-base leading-relaxed font-light">
                        У нас действует щедрая реферальная программа. Построй свою команду и получай бонусы за каждого активного участника.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-7 rounded-3xl border border-cream-200 shadow-luxury flex flex-col gap-5 overflow-hidden"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                            <Gift className="w-6 h-6 text-rose-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-serif text-xl text-brown-900 leading-tight">Бонус за приглашение</h3>
                            <p className="text-brown-500 text-sm leading-relaxed font-light">
                                Получай <span className="font-bold text-brown-900">5 000 ₽</span> за каждую подругу, которая успешно пройдёт обучение и отработает первую неделю.
                            </p>
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-rose-500 font-bold text-[10px] uppercase tracking-wider">
                            Подробнее у куратора
                            <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </div>
                    </motion.div>

                    {/* Card 2 — rose gradient instead of dark */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gradient-to-br from-rose-50 via-white to-champagne-100 p-7 rounded-3xl border border-rose-100 shadow-luxury flex flex-col gap-5 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 opacity-20 blur-3xl rounded-full pointer-events-none" />

                        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                            <Star className="w-6 h-6 text-rose-500" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-serif text-xl text-brown-900 leading-tight">Построй карьеру</h3>
                            <p className="text-brown-600 text-sm leading-relaxed font-light">
                                Лучшие операторы становятся <span className="text-rose-500 font-semibold">кураторами</span>. Управляй командой, обучай новичков и получай % от общего оборота.
                            </p>
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-rose-500 font-bold text-[10px] uppercase tracking-wider">
                            Твой путь к успеху
                            <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
