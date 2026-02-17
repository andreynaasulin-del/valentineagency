'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

type Message = {
    id: number
    role: 'assistant' | 'user'
    text: string
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
    {
        keywords: ['зарплата', 'доход', 'сколько', 'заработ', 'оплат', 'деньг', 'платят', 'выплат', 'получ'],
        answer: 'Доход от 2 500 до 4 000₽ за одну смену. Выплаты каждый понедельник на карту, стабильно и без комиссий. При 20 сменах в месяц это 50 000 – 80 000₽.',
    },
    {
        keywords: ['график', 'время', 'смен', 'когда', 'расписан', 'час', 'утро', 'день', 'вечер'],
        answer: 'У нас 3 смены на выбор: Утро (09:00–16:00), День (13:00–20:00) и Вечер (17:00–00:00). Вы сами выбираете удобное время. Можно брать дополнительные смены для увеличения дохода.',
    },
    {
        keywords: ['обучен', 'стажир', 'опыт', 'учить', 'новичок', 'нуля', 'начинающ'],
        answer: 'Обучение с нуля за 3-4 дня, стажировка оплачивается! За вами закрепляется наставник, который проведет через все этапы. Опыт работы не требуется.',
    },
    {
        keywords: ['устройств', 'телефон', 'компьют', 'ноутбук', 'пк', 'планшет', 'девайс', 'техник'],
        answer: 'Работать можно с любого устройства: телефон, планшет, ноутбук или ПК. Главное — стабильный интернет.',
    },
    {
        keywords: ['подать', 'анкет', 'заявк', 'начать', 'устроит', 'подключ', 'оформ', 'записат'],
        answer: 'Заполните анкету на сайте — это займет 1 минуту. Мы свяжемся с вами в Telegram в течение 15-30 минут. После короткого собеседования начинается оплачиваемое обучение.',
    },
    {
        keywords: ['telegram', 'телеграм', 'связь', 'контакт', 'написат', 'позвонит', 'поддержк'],
        answer: 'После отправки анкеты мы напишем вам в Telegram в течение 15-30 минут. Поддержка работает 24/7 — всегда поможем с любым вопросом.',
    },
    {
        keywords: ['что делать', 'работа', 'оператор', 'чат', 'обязанност', 'чем заним', 'суть'],
        answer: 'Работа онлайн-оператора чата: вы общаетесь с клиентами в чате, отвечаете на вопросы и помогаете решить их задачи. Всё онлайн, из любой точки мира.',
    },
    {
        keywords: ['возраст', 'лет', 'сколько лет', 'молод', 'стар'],
        answer: 'Мы принимаем кандидатов от 18 до 65 лет. Главное — ответственность и желание работать.',
    },
    {
        keywords: ['откуда', 'город', 'страна', 'удалённ', 'онлайн', 'дом', 'место'],
        answer: 'Работа полностью удалённая — из любого города и страны. Вам нужен только интернет и устройство (телефон или ноутбук).',
    },
    {
        keywords: ['привет', 'здравств', 'добрый', 'хай', 'hello', 'hi', 'ку', 'хей'],
        answer: 'Здравствуйте! Я ассистент Valentine Agency. Могу рассказать о вакансии, доходе, графике и процессе подачи заявки. Что вас интересует?',
    },
]

const DEFAULT_ANSWER = 'Извините, я не нашёл точного ответа. Вы можете заполнить анкету на сайте, и наш менеджер ответит на все вопросы в Telegram за 15-30 минут. Или спросите меня о: доходе, графике, обучении или процессе подачи заявки.'

function findAnswer(query: string): string {
    const lower = query.toLowerCase()
    let bestMatch: { answer: string; matchCount: number } | null = null

    for (const item of KNOWLEDGE_BASE) {
        const matchCount = item.keywords.filter(kw => lower.includes(kw)).length
        if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.matchCount)) {
            bestMatch = { answer: item.answer, matchCount }
        }
    }

    return bestMatch?.answer ?? DEFAULT_ANSWER
}

const QUICK_QUESTIONS = [
    'Сколько можно заработать?',
    'Какой график работы?',
    'Нужен ли опыт?',
    'Как подать заявку?',
]

export function AiAssistant() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: 0,
            role: 'assistant',
            text: 'Привет! Я ассистент Valentine Agency. Задайте вопрос о вакансии, и я помогу разобраться.',
        },
    ])
    const [input, setInput] = React.useState('')
    const [isTyping, setIsTyping] = React.useState(false)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [isOpen])

    const sendMessage = (text: string) => {
        if (!text.trim()) return

        const userMsg: Message = {
            id: Date.now(),
            role: 'user',
            text: text.trim(),
        }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        setTimeout(() => {
            const answer = findAnswer(text)
            const botMsg: Message = {
                id: Date.now() + 1,
                role: 'assistant',
                text: answer,
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 600 + Math.random() * 400)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-2xl bg-brown-900 text-white shadow-luxury flex items-center justify-center hover:bg-brown-800 transition-colors duration-500 overflow-hidden group"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Открыть чат с ассистентом"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-champagne-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <MessageCircle className="w-6 h-6" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-brown-900 animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed bottom-28 right-8 z-50 w-[400px] max-w-[calc(100vw-64px)] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-luxury border border-cream-200 overflow-hidden flex flex-col"
                        style={{ maxHeight: 'min(600px, calc(100vh - 160px))' }}
                    >
                        {/* Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-rose-100/60 to-champagne-100/40 border-b border-cream-200/40 flex items-center gap-3 flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-champagne-400 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-sm font-semibold text-brown-800">Ассистент Valentine</span>
                                <span className="text-[10px] text-brown-400 uppercase tracking-[0.1em]">Онлайн</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-gradient-to-br from-rose-400 to-champagne-400 text-white rounded-2xl rounded-br-md'
                                                : 'bg-cream-100/80 text-brown-600 rounded-2xl rounded-bl-md border border-cream-200/60'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-cream-100/80 text-brown-400 rounded-2xl rounded-bl-md border border-cream-200/60 px-4 py-3 flex gap-1.5 items-center">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-2 h-2 rounded-full bg-brown-300"
                                                style={{
                                                    animation: `typing-dot 1.2s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.2}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick questions (shown only if < 3 messages) */}
                        {messages.length < 3 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                                {QUICK_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-[11px] px-3 py-1.5 rounded-full bg-rose-50 text-rose-500 border border-rose-200/50 hover:bg-rose-100 hover:border-rose-300 transition-all duration-200 font-medium"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-cream-200/40 flex gap-2 items-center flex-shrink-0 bg-white/80">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Задайте вопрос..."
                                className="flex-1 bg-transparent text-sm text-brown-700 placeholder:text-brown-300 focus:outline-none font-sans"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-champagne-400 text-white flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:shadow-soft transition-all duration-300 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
