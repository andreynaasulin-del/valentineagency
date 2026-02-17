'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 250 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const checkHover = () => {
            const hoveredEl = document.querySelectorAll(':hover')
            const lastEl = hoveredEl[hoveredEl.length - 1]
            if (lastEl) {
                const style = window.getComputedStyle(lastEl)
                const isClickable =
                    style.cursor === 'pointer' ||
                    lastEl.tagName === 'BUTTON' ||
                    lastEl.tagName === 'A' ||
                    lastEl.closest('button') ||
                    lastEl.closest('a')

                setIsHovered(!!isClickable)
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', checkHover)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', checkHover)
        }
    }, [cursorX, cursorY])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Circle */}
            <motion.div
                className="absolute w-8 h-8 border border-rose-400 rounded-full"
                style={{
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? 'rgba(212, 134, 138, 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
            />

            {/* Center Dot */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-rose-500 rounded-full"
                style={{
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 0.5 : 1,
                }}
            />

            {/* Bloom Effect */}
            <motion.div
                className="absolute w-20 h-20 bg-rose-400/20 blur-2xl rounded-full"
                style={{
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHovered ? 0.6 : 0.3,
                }}
            />
        </div>
    )
}
