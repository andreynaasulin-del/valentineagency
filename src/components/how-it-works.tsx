'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Banknote } from 'lucide-react'

const schedules = [
    { period: 'Утро', time: '09:00 - 16:00', emoji: '☀️' },
    { period: 'День', time: '13:00 - 20:00', emoji: '🌤', popular: true },
    { period: 'Вечер', time: '17:00 - 00:00', emoji: '🌙' },
]

const steps = [
    { num: '01', title: 'Анкета', desc: 'Заполните форму выше. Ответим в Telegram за 15-30 мин' },
    { num: '02', title: 'Обучение', desc: '3-4 дня стажировки с оплатой + наставник' },
    { num: '03', title: 'Первая смена', desc: 'Выбираете график и начинаете зарабатывать' },
    { num: '04', title: 'Выплаты', desc: 'Каждый понедельник - стабильно, честно' },
]

export const HowItWorks = () => {
    return (
        <section className="relative max-w-5xl mx-auto px-6 sm:px-10 py-20 overflow-hidden">

            {/* Decorative Orbs */}
            <div className="orb-rose w-[450px] h-[450px] top-10 -right-32 opacity-30 animate-float-slow" />
            <div className="orb-gold w-[350px] h-[350px] bottom-20 -left-10 opacity-20 animate-pulse-soft" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-start">

                {/* Left Column: Schedule */}
                <div className="w-full lg:w-1/2 flex flex-col gap-10">

                    {/* Header */}
                    <div className="flex flex-col gap-8 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="label-text text-rose-400">Гибкость</span>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </div>
                        <h2 className="display-title text-3xl sm:text-4xl leading-tight tracking-tight">
                            Ваш <span className="gradient-text italic">График</span>
                        </h2>
                        <p className="text-brown-500/70 text-sm sm:text-base leading-relaxed font-light max-w-md">
                            Совмещайте с учебой или личной жизнью. Мы ценим вашу свободу и предлагаем только удобные смены.
                        </p>
                    </div>

                    {/* Schedule Cards */}
                    <div className="flex flex-col gap-6">
                        {schedules.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <div>
                                    <div className={`card-premium p-6 rounded-2xl flex items-center justify-between cursor-default backdrop-blur-md
                                        ${s.popular
                                            ? 'bg-gradient-to-r from-rose-100/80 via-white/40 to-champagne-100/60 border border-rose-200/50 shadow-luxury'
                                            : 'bg-white/60 border border-cream-200 shadow-soft hover:border-rose-300/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-soft ${s.popular ? 'bg-white/90' : 'bg-cream-50'
                                                }`}>
                                                {s.emoji}
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-serif text-2xl text-brown-800 tracking-tight leading-none">{s.period}</span>
                                                    {s.popular && (
                                                        <motion.span
                                                            animate={{ scale: [1, 1.05, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-rose-500 bg-white/90 px-3 py-1.5 rounded-full border border-rose-200/50 shadow-soft"
                                                        >
                                                            <Sparkles className="w-3 h-3 fill-rose-400 text-rose-400" />
                                                            хит
                                                        </motion.span>
                                                    )}
                                                </div>
                                                <p className="text-brown-400 text-sm font-medium tracking-wide uppercase">{s.time}</p>
                                            </div>
                                        </div>

                                        <div className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white/80 border border-cream-200 shadow-soft">
                                            <Check className="w-4 h-4 text-rose-300" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Extra info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card-premium flex items-center gap-6 p-8 rounded-[2rem] bg-brown-900 text-white border border-brown-800 shadow-luxury"
                    >
                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 text-rose-300 flex-shrink-0 animate-pulse">
                            <Banknote className="w-6 h-6" />
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed tracking-wide font-light">
                            Возможность брать дополнительные смены и увеличить свой доход <span className="text-rose-400 font-bold tracking-widest ml-1">X2</span> в любое время
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Steps */}
                <div className="w-full lg:w-1/2 flex flex-col gap-10">

                    {/* Header */}
                    <div className="flex flex-col gap-8 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="label-text text-rose-400">Процесс</span>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </div>
                        <h3 className="display-title text-3xl sm:text-4xl leading-tight tracking-tight">Как <span className="italic font-light">начать</span></h3>
                        <p className="text-brown-500/70 text-sm sm:text-base leading-relaxed font-light">
                            Всего четыре простых шага отделяют вас от стабильно высокого онлайн-дохода.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                className="group flex gap-8 items-start"
                            >
                                {/* Left: number circle + line */}
                                <div className="flex flex-col items-center gap-4 flex-shrink-0 pt-2">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-center justify-center text-brown-400 text-base font-mono font-bold group-hover:border-rose-300 group-hover:bg-rose-50 group-hover:text-rose-500 group-hover:shadow-glow transition-all duration-500">
                                        {step.num}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="w-px h-16 bg-gradient-to-b from-rose-200/60 to-transparent rounded-full" />
                                    )}
                                </div>

                                {/* Right: content card */}
                                <div className="flex-1">
                                    <div className="h-full bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-cream-200 group-hover:border-rose-200/60 shadow-soft transition-all duration-500 group-hover:shadow-luxury">
                                        <h4 className="font-serif text-xl text-brown-800 mb-2 leading-tight tracking-tight">{step.title}</h4>
                                        <p className="text-brown-500/70 text-sm leading-relaxed font-light">{step.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
