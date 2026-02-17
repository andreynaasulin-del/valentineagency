'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        const moveX = (clientX - centerX) * strength
        const moveY = (clientY - centerY) * strength

        setPosition({ x: moveX, y: moveY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
}
