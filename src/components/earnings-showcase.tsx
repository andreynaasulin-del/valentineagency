'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react'

const earnings = [
    {
        name: 'Анна К.',
        amount: '42 500 ₽',
        period: 'за прошлую неделю',
        tag: 'Топ-перформер',
        avatar: '🌸',
    },
    {
        name: 'Виктория С.',
        amount: '28 900 ₽',
        period: 'за 5 смен',
        tag: 'Стабильность',
        avatar: '✨',
    },
    {
        name: 'Мария Д.',
        amount: '35 200 ₽',
        period: 'за прошлую неделю',
        tag: 'Высокий чек',
        avatar: '💎',
    }
]

export const EarningsShowcase = () => {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne-100/30 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            <span className="label-text text-rose-400 uppercase tracking-[0.15em] text-[10px] font-bold">Прозрачность</span>
                        </div>
                        <h2 className="display-title text-3xl sm:text-4xl leading-tight tracking-tight">
                            Результаты <span className="gradient-text italic font-extralight">команды</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-cream-200 flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-brown-400 uppercase tracking-wider font-bold whitespace-nowrap">Выплачено за февраль</span>
                            <span className="text-lg font-serif font-bold text-brown-900">1 240 000 ₽</span>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {earnings.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -6 }}
                            className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-cream-200 shadow-luxury flex flex-col gap-5 group overflow-hidden"
                        >
                            {/* Avatar + name row */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-11 h-11 rounded-full bg-cream-100 flex items-center justify-center text-xl flex-shrink-0">
                                        {item.avatar}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-serif font-bold text-brown-900 text-sm truncate">{item.name}</span>
                                        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider truncate">{item.tag}</span>
                                    </div>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                                    <Wallet className="w-4 h-4 text-rose-300" />
                                </div>
                            </div>

                            {/* Amount block */}
                            <div className="flex flex-col gap-1 p-5 rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-cream-100/50">
                                <span className="text-2xl font-serif font-bold text-brown-900 tracking-tight group-hover:text-rose-500 transition-colors leading-tight">
                                    {item.amount}
                                </span>
                                <span className="text-xs text-brown-400 font-light">{item.period}</span>
                            </div>

                            {/* Status badge */}
                            <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-wider bg-green-50 w-fit px-3 py-1.5 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                                Выплачено по чеку
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-brown-400/60 text-xs font-light max-w-2xl mx-auto italic leading-relaxed">
                        * Все данные анонимизированы в целях безопасности. Реальный доход зависит от количества отработанных смен и вашей активности.
                    </p>
                </div>
            </div>
        </section>
    )
}
