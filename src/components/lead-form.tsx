'use client'

import React from 'react'
import { TrendingUp, Sparkles, CheckCircle2, Clock, ShieldCheck, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/language-context'

/* ─── Inline premium input ─── */
function PremiumInput({
    id,
    name,
    label,
    type = 'text',
    required,
    disabled,
    step,
}: {
    id: string
    name: string
    label: string
    type?: string
    required?: boolean
    disabled?: boolean
    step?: number
}) {
    const [focused, setFocused] = React.useState(false)
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {step && (
                    <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${focused ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-400'}`}>
                        {step}
                    </span>
                )}
                <label
                    htmlFor={id}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${focused ? 'text-rose-500' : 'text-brown-400'}`}
                >
                    {label}
                </label>
            </div>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                disabled={disabled}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`w-full rounded-2xl px-5 py-4 text-brown-900 font-serif text-base focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
                    focused
                        ? 'bg-white border-rose-400 shadow-[0_0_24px_-4px_rgba(212,134,138,0.35)]'
                        : 'bg-cream-50 border-cream-200 hover:border-cream-300'
                }`}
            />
        </div>
    )
}

/* ─── Inline premium select ─── */
function PremiumSelect({
    id,
    name,
    label,
    required,
    disabled,
    step,
    children,
    defaultValue,
}: {
    id: string
    name: string
    label: string
    required?: boolean
    disabled?: boolean
    step?: number
    children: React.ReactNode
    defaultValue?: string
}) {
    const [focused, setFocused] = React.useState(false)
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {step && (
                    <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${focused ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-400'}`}>
                        {step}
                    </span>
                )}
                <label
                    htmlFor={id}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${focused ? 'text-rose-500' : 'text-brown-400'}`}
                >
                    {label}
                </label>
            </div>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    required={required}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full rounded-2xl px-5 py-4 pr-10 text-brown-900 font-serif text-base appearance-none cursor-pointer focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
                        focused
                            ? 'bg-white border-rose-400 shadow-[0_0_24px_-4px_rgba(212,134,138,0.35)]'
                            : 'bg-cream-50 border-cream-200 hover:border-cream-300'
                    }`}
                >
                    {children}
                </select>
                <ChevronDown className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${focused ? 'text-rose-400' : 'text-brown-300'}`} />
            </div>
        </div>
    )
}

export function LeadForm() {
    const { t } = useLanguage()
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = React.useState('')
    const [shifts, setShifts] = React.useState(20)

    const handleSubmit = async (formData: FormData) => {
        setStatus('submitting')
        setErrorMsg('')

        const { submitLead } = await import('@/app/actions')
        const result = await submitLead(formData)

        if (!result.success && result.error) {
            setStatus('error')
            setErrorMsg(result.error)
            setTimeout(() => { setStatus('idle'); setErrorMsg('') }, 5000)
        } else {
            setStatus('success')
        }
    }

    const minIncome = shifts * 2500
    const maxIncome = shifts * 4000
    const avgIncome = Math.round((minIncome + maxIncome) / 2)

    if (status === 'success') {
        return (
            <div className="bg-white p-12 md:p-24 text-center border-2 border-rose-100 rounded-3xl shadow-luxury flex flex-col items-center justify-center min-h-[500px]">
                <div className="flex flex-col gap-10 items-center">
                    <div className="w-24 h-24 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-rose-400" strokeWidth={1.2} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-serif text-4xl md:text-5xl text-brown-900 leading-tight">{t('form.successTitle')}</h3>
                        <p className="font-serif italic text-lg md:text-xl text-brown-500 max-w-lg mx-auto leading-relaxed">
                            {t('form.successDesc')}
                        </p>
                    </div>
                    <button
                        onClick={() => setStatus('idle')}
                        className="font-bold text-xs uppercase tracking-[0.4em] text-rose-500 hover:text-rose-600 transition-colors"
                    >
                        {t('form.sendMore')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 relative z-10 w-full py-16">

            {/* ─── Income Calculator ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white p-7 md:p-10 rounded-3xl border border-cream-200 shadow-luxury relative overflow-hidden"
            >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-100 opacity-30 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative flex flex-col gap-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brown-900 text-white flex items-center justify-center shadow-lg flex-shrink-0">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-3xl md:text-4xl text-brown-900 tracking-tight leading-tight">{t('calculator.title')}</h3>
                        </div>
                        <div className="bg-rose-50 px-5 py-2.5 rounded-full border border-rose-100 flex-shrink-0">
                            <span className="text-xl font-bold text-rose-600">{shifts}</span>
                            <span className="ml-2 text-[10px] uppercase tracking-widest text-rose-400 font-bold">{t('calculator.shifts')}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <input
                            type="range"
                            min="5"
                            max="30"
                            value={shifts}
                            onChange={(e) => setShifts(Number(e.target.value))}
                            aria-label="Количество смен"
                            className="range-slider w-full"
                        />
                        <div className="flex justify-between text-[10px] text-brown-400 font-bold uppercase tracking-[0.25em]">
                            <span>{t('calculator.min')} (5)</span>
                            <span className="text-rose-400">{t('calculator.hint')}</span>
                            <span>{t('calculator.max')} (30)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-6 rounded-2xl bg-cream-50 border border-cream-100 overflow-hidden min-w-0">
                            <span className="text-[10px] text-brown-400 uppercase tracking-[0.2em] font-bold block mb-2">{t('calculator.expected')}</span>
                            <div className="font-serif text-3xl md:text-4xl font-bold text-brown-900 leading-none truncate">
                                {avgIncome.toLocaleString('ru-RU')} ₽
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-brown-900 text-white overflow-hidden relative min-w-0">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500 opacity-10 blur-2xl rounded-full pointer-events-none" />
                            <span className="text-[10px] text-white opacity-40 uppercase tracking-[0.2em] font-bold block mb-2">{t('calculator.range')}</span>
                            <div className="font-serif text-xl md:text-2xl font-medium leading-tight">
                                {minIncome.toLocaleString('ru-RU')} <span className="opacity-30 mx-1">—</span> {maxIncome.toLocaleString('ru-RU')} ₽
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ─── Bridge text ─── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center flex flex-col items-center gap-3"
            >
                <p className="font-serif text-2xl md:text-3xl text-brown-800 italic">
                    {t('form.bridge')}
                </p>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-rose-400 text-xl"
                >
                    ↓
                </motion.div>
            </motion.div>

            {/* ─── Application Form ─── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-3xl"
            >
                {/* Gradient border effect via wrapper */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-200 via-cream-100 to-champagne-200 p-px pointer-events-none" />

                <div className="relative bg-white rounded-3xl shadow-luxury overflow-hidden">
                    {/* Top accent strip */}
                    <div className="h-1 w-full bg-gradient-to-r from-rose-300 via-rose-400 to-champagne-400" />

                    {/* Decorative bg orbs */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-100 opacity-40 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-champagne-100 opacity-40 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative p-7 md:p-10">
                        {/* Urgency badge */}
                        <div className="flex justify-center mb-10">
                            <motion.div
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold uppercase tracking-[0.2em]"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse flex-shrink-0" />
                                <Clock className="w-3 h-3 flex-shrink-0" />
                                {t('form.urgency')}
                            </motion.div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-12">
                            <h3 className="font-serif text-4xl md:text-5xl text-brown-900 leading-tight tracking-tight">
                                {t('form.title')}
                            </h3>
                            <p className="mt-3 text-sm text-brown-400 font-light">{t('form.footer')}</p>
                        </div>

                        {/* Form */}
                        <form action={handleSubmit} className="flex flex-col gap-7 max-w-2xl mx-auto">
                            {/* Row 1: Name + Age */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PremiumInput id="name" name="name" label={t('form.name')} step={1} required disabled={status === 'submitting'} />
                                <PremiumInput id="age" name="age" type="number" label={t('form.age')} step={2} required disabled={status === 'submitting'} />
                            </div>

                            {/* Telegram */}
                            <PremiumInput id="telegram" name="telegram" label={t('form.telegram')} step={3} required disabled={status === 'submitting'} />

                            {/* Row 2: Shift + Device */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <PremiumSelect id="shift" name="shift" label={t('form.shift')} step={4} required disabled={status === 'submitting'} defaultValue="">
                                    <option value="" disabled>{t('form.shiftPlaceholder')}</option>
                                    <option value="morning">{t('form.shifts.morning')}</option>
                                    <option value="day">{t('form.shifts.day')}</option>
                                    <option value="evening">{t('form.shifts.evening')}</option>
                                </PremiumSelect>
                                <PremiumSelect id="device" name="device" label={t('form.device')} step={5} required disabled={status === 'submitting'} defaultValue="">
                                    <option value="" disabled>{t('form.devicePlaceholder')}</option>
                                    <option value="phone">{t('form.devices.phone')}</option>
                                    <option value="laptop">{t('form.devices.laptop')}</option>
                                    <option value="both">{t('form.devices.both')}</option>
                                </PremiumSelect>
                            </div>

                            {/* Error */}
                            {status === 'error' && errorMsg && (
                                <div className="text-center text-sm text-rose-600 bg-rose-50 py-3 px-4 rounded-2xl border border-rose-100">
                                    {errorMsg}
                                </div>
                            )}

                            {/* Divider */}
                            <div className="h-px bg-cream-200 my-1" />

                            {/* Submit + Privacy */}
                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-gradient-to-r from-rose-500 to-rose-400 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.25em] shadow-btn-hover hover:scale-[1.02] active:scale-95 transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <div className="w-5 h-5 border-2 border-white border-opacity-20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Sparkles className="w-4 h-4" />
                                    )}
                                    {status === 'submitting' ? t('form.submitting') : t('form.submit')}
                                </button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-brown-300">
                                    <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                                    <span>{t('form.privacy')}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
