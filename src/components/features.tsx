'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Banknote, Clock, Laptop, GraduationCap } from 'lucide-react'

const features = [
    {
        title: 'Высокий Доход',
        desc: 'От 2500 до 4000₽ за одну смену. Выплаты каждый понедельник, стабильно и без комиссий',
        icon: Banknote,
        span: 2,
    },
    {
        title: 'Удобный График',
        desc: 'Утро, День или Вечер - выбирайте сами. Легко совмещать с учебой',
        icon: Clock,
        span: 1,
    },
    {
        title: 'Полный Онлайн',
        desc: 'Из любой точки мира. Телефон или ноутбук',
        icon: Laptop,
        span: 1,
    },
    {
        title: 'Обучение с Нуля',
        desc: 'Оплачиваемая стажировка 3-4 дня. Наставник проведет вас через все этапы',
        icon: GraduationCap,
        span: 2,
        featured: true,
    },
]

export const Features = () => {
    return (
        <section className="relative max-w-5xl mx-auto px-6 sm:px-10 py-20 overflow-hidden">

            {/* Decorative Orbs */}
            <div className="orb-gold w-[450px] h-[450px] -top-32 -left-32 opacity-40 animate-float-slow" />
            <div className="orb-rose w-[350px] h-[350px] bottom-0 -right-20 opacity-30 animate-pulse-soft" />

            {/* Header */}
            <div className="relative z-10 mb-10 max-w-lg mx-auto text-center flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-[1px] w-8 bg-rose-200" />
                    <span className="label-text text-rose-400">Преимущества</span>
                    <div className="h-[1px] w-8 bg-rose-200" />
                </div>
                <h2 className="display-title text-4xl sm:text-5xl leading-tight tracking-tight">
                    Почему <span className="gradient-text italic">мы</span>
                </h2>
                <p className="text-brown-500/70 text-base leading-relaxed font-light max-w-sm">
                    Мы создали идеальную среду для высокого дохода и личного комфорта.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        className={`${feat.span === 2 ? 'md:col-span-2' : ''}`}
                    >
                        <div className="h-full">
                            <div className={`group h-full card-premium p-6 sm:p-8 rounded-3xl border flex flex-col gap-4 min-h-[200px] backdrop-blur-md overflow-hidden
                            ${feat.featured
                                    ? 'bg-gradient-to-br from-rose-100/80 via-white/40 to-champagne-100/60 border-rose-200/50 shadow-luxury'
                                    : 'bg-white/60 border-cream-200/60 shadow-soft hover:border-rose-300/30'
                                }`}>
                                {/* Icon + Tag row */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${feat.featured
                                        ? 'bg-gradient-to-br from-rose-200 to-rose-300 text-white shadow-glow'
                                        : 'bg-cream-100 text-rose-300 group-hover:text-white group-hover:bg-rose-400 shadow-soft'
                                        }`}>
                                        <feat.icon className="w-7 h-7 stroke-[1.2]" />
                                    </div>
                                    {feat.featured && (
                                        <motion.span
                                            animate={{ scale: [1, 1.04, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="text-[9px] font-bold uppercase tracking-[0.15em] text-rose-500 bg-white/90 px-3 py-1.5 rounded-full border border-rose-200/50 shadow-soft flex-shrink-0 whitespace-nowrap"
                                        >
                                            ★ Премиум
                                        </motion.span>
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-serif text-2xl text-brown-800 leading-tight tracking-tight group-hover:text-brown-900 transition-colors duration-300">{feat.title}</h3>
                                    <p className="text-brown-500/70 text-sm leading-relaxed font-light">{feat.desc}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
