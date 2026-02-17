'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, CheckCircle2 } from 'lucide-react'

const names = ['Анна', 'Мария', 'Виктория', 'Елена', 'Кристина', 'Александра', 'Дарья', 'София', 'Анастасия', 'Юлия']
const cities = ['Москвы', 'Санкт-Петербурга', 'Казани', 'Екатеринбурга', 'Новосибирска', 'Краснодара', 'Минска', 'Астаны']

type Activity = {
    id: number
    name: string
    city: string
    time: string
}

export const LiveActivity = () => {
    const [activity, setActivity] = useState<Activity | null>(null)

    useEffect(() => {
        const generateActivity = () => {
            const newActivity = {
                id: Date.now(),
                name: names[Math.floor(Math.random() * names.length)],
                city: cities[Math.floor(Math.random() * cities.length)],
                time: 'только что',
            }
            setActivity(newActivity)

            // Auto hide after 5 seconds
            setTimeout(() => setActivity(null), 5000)
        }

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                generateActivity()
            }
        }, 12000)

        // Initial delay
        const initialTimeout = setTimeout(generateActivity, 3000)

        return () => {
            clearInterval(interval)
            clearTimeout(initialTimeout)
        }
    }, [])

    return (
        <div className="fixed bottom-20 sm:bottom-24 left-4 sm:left-8 z-40 pointer-events-none">
            <AnimatePresence>
                {activity && (
                    <motion.div
                        initial={{ opacity: 0, x: -40, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-xl border border-cream-200 p-3 sm:p-4 rounded-2xl shadow-luxury flex items-center gap-3 sm:gap-4 max-w-[calc(100vw-32px)] sm:min-w-[280px]"
                    >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold text-brown-900 truncate">{activity.name}</span>
                                <span className="text-[9px] sm:text-[10px] text-brown-400 font-medium uppercase tracking-wider flex-shrink-0">из {activity.city}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-green-600">
                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-medium">Отправила анкету {activity.time}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
