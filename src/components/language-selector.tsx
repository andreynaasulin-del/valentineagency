'use client'

import React from 'react'
import { useLanguage } from '@/context/language-context'

export const LanguageSelector = () => {
    const { lang, setLang } = useLanguage()

    return (
        <div className="fixed top-8 right-8 z-[100] flex gap-2">
            <button
                onClick={() => setLang('ru')}
                className={`w-12 h-12 rounded-full border flex items-center justify-center text-[11px] font-bold tracking-tighter transition-all duration-500 overflow-hidden relative group ${lang === 'ru'
                        ? 'bg-brown-950 text-white border-brown-950'
                        : 'bg-white/80 backdrop-blur-xl text-brown-400 border-cream-200 hover:border-rose-400'
                    }`}
            >
                RU
            </button>
            <button
                onClick={() => setLang('en')}
                className={`w-12 h-12 rounded-full border flex items-center justify-center text-[11px] font-bold tracking-tighter transition-all duration-500 overflow-hidden relative group ${lang === 'en'
                        ? 'bg-brown-950 text-white border-brown-950'
                        : 'bg-white/80 backdrop-blur-xl text-brown-400 border-cream-200 hover:border-rose-400'
                    }`}
            >
                EN
            </button>
        </div>
    )
}
