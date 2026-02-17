'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'ru' | 'en'

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    ru: {
        hero: {
            badge: 'Набор открыт',
            agency: 'Agency',
            description: 'Работайте онлайн из любой точки мира. Стабильный доход, гибкий график и полная поддержка команды. Обучаем с нуля.',
            cta: 'Перейти к анкете'
        },
        calculator: {
            title: 'Калькулятор Дохода',
            shifts: 'смен в месяц',
            min: 'Минимум',
            max: 'Максимум',
            hint: 'Сдвигай ползунок',
            expected: 'Ожидаемый средний доход',
            range: 'Диапазон выплат',
            payouts: 'Стабильно каждый понедельник'
        },
        form: {
            badge: 'Application Form',
            title: 'Стань частью команды',
            bridge: 'Хочешь столько же? Заполни анкету за 1 минуту',
            urgency: 'Осталось 12 мест на этой неделе',
            privacy: 'Данные защищены и не передаются третьим лицам',
            name: 'Как к вам обращаться?',
            age: 'Ваш возраст',
            telegram: 'Telegram для связи (@username)',
            shift: 'Желаемая смена',
            shiftPlaceholder: 'Выберите время',
            shifts: {
                morning: 'Утро (09:00 - 16:00)',
                day: 'День (13:00 - 20:00)',
                evening: 'Вечер (17:00 - 00:00)'
            },
            device: 'Ваше устройство',
            devicePlaceholder: 'Что будете использовать?',
            devices: {
                phone: 'Смартфон',
                laptop: 'ПК / Ноутбук',
                both: 'И то, и другое'
            },
            submit: 'Отправить Заявку',
            submitting: 'Отправка анкеты...',
            footer: 'Команда Valentine свяжется с вами в ближайшее время',
            successTitle: 'Заявка Принята',
            successDesc: 'Мы свяжемся с вами в Telegram обычно в течение 15-30 минут',
            sendMore: 'Отправить ещё'
        },
        footer: {
            tagline: 'Работа мечты начинается здесь',
            form: 'Анкета',
        },
        stickyCta: 'Заполнить анкету',
        faq: {
            title: 'Ответы на вопросы',
            items: [
                {
                    q: 'Нужен ли опыт работы?',
                    a: 'Нет, мы обучаем с нуля. Программа занимает 3 дня и полностью оплачивается.'
                },
                {
                    q: 'Какое устройство нужно?',
                    a: 'Любой смартфон или ноутбук со стабильным интернетом.'
                },
                {
                    q: 'Как часто выплаты?',
                    a: 'Каждый понедельник в полном объеме без скрытых комиссий.'
                },
                {
                    q: 'Можно ли совмещать?',
                    a: 'Да, у нас 3 смены на выбор, график подстраивается под вас.'
                }
            ]
        }
    },
    en: {
        hero: {
            badge: 'Open for applications',
            agency: 'Agency',
            description: 'Work online from anywhere in the world. Stable income, flexible schedule, and full team support. We train from scratch.',
            cta: 'Go to Application'
        },
        calculator: {
            title: 'Income Calculator',
            shifts: 'shifts per month',
            min: 'Minimum',
            max: 'Maximum',
            hint: 'Move the slider',
            expected: 'Expected Average Income',
            range: 'Payout Range',
            payouts: 'Every Monday, guaranteed'
        },
        form: {
            badge: 'Application Form',
            title: 'Join our team',
            bridge: 'Want the same? Fill out the form in 1 minute',
            urgency: 'Only 12 spots left this week',
            privacy: 'Your data is protected and never shared with third parties',
            name: 'What is your name?',
            age: 'Your age',
            telegram: 'Telegram handle (@username)',
            shift: 'Preferred shift',
            shiftPlaceholder: 'Select time',
            shifts: {
                morning: 'Morning (09:00 - 16:00)',
                day: 'Day (13:00 - 20:00)',
                evening: 'Evening (17:00 - 00:00)'
            },
            device: 'Your device',
            devicePlaceholder: 'What will you use?',
            devices: {
                phone: 'Smartphone',
                laptop: 'PC / Laptop',
                both: 'Both'
            },
            submit: 'Submit Application',
            submitting: 'Submitting...',
            footer: 'Valentine Team will contact you shortly',
            successTitle: 'Application Received',
            successDesc: 'We will contact you on Telegram, usually within 15-30 minutes',
            sendMore: 'Send another'
        },
        footer: {
            tagline: 'Your dream job starts here',
            form: 'Application',
        },
        stickyCta: 'Apply Now',
        faq: {
            title: 'FAQ',
            items: [
                {
                    q: 'Do I need experience?',
                    a: 'No, we provide full training. The 3-day program is fully paid.'
                },
                {
                    q: 'What device do I need?',
                    a: 'Any smartphone or laptop with a stable internet connection.'
                },
                {
                    q: 'How often are the payouts?',
                    a: 'Every Monday in full, with no hidden fees.'
                },
                {
                    q: 'Can I combine it with study?',
                    a: 'Yes, we have 3 shifts to choose from, tailored to your schedule.'
                }
            ]
        }
    }
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState<Language>('ru')

    const t = (path: string) => {
        const keys = path.split('.')
        let result: any = translations[lang]
        for (const key of keys) {
            if (result[key]) result = result[key]
            else return path
        }
        return result
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within LanguageProvider')
    return context
}
