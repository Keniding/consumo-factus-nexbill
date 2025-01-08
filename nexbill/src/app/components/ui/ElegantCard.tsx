
import React from 'react'

interface ElegantCardProps {
    children: React.ReactNode
    variant?: 'default' | 'bordered' | 'elevated'
    className?: string
    animated?: boolean
}

export function ElegantCard({
                                children,
                                variant = 'default',
                                animated = true,
                                className = ''
                            }: ElegantCardProps) {
    const baseStyles = "rounded-lg bg-brand-card p-6 relative overflow-hidden"

    const variants = {
        default: "border border-gray-200",
        bordered: "border-2 border-brand-primary/20 hover:border-brand-primary/40",
        elevated: "shadow-medium hover:shadow-strong transition-all duration-300"
    }

    const animationStyles = animated ? "animate-scale-in hover:-translate-y-1" : ""

    return (
        <div
            className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${animationStyles}
        ${className}
        transform transition-all duration-300
      `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}