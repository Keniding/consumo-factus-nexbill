interface ElegantButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
}

export function ElegantButton({
                                  children,
                                  variant = 'primary',
                                  size = 'md',
                                  className = '',
                                  type = 'button',
                                  disabled = false,
                                  onClick,
                              }: ElegantButtonProps) {
    const baseStyles = "relative font-medium rounded-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 active:translate-y-0"

    const variants = {
        primary: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg hover:from-brand-secondary hover:to-brand-primary",
        secondary: "bg-gradient-to-r from-brand-accent to-brand-accent/80 text-white hover:shadow-lg",
        outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
        ghost: "bg-transparent hover:bg-brand-primary/10 text-brand-primary"
    }

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-2.5 text-lg"
    }

    // Añadimos estilos para el estado disabled
    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed hover:transform-none"
        : ""

    return (
        <button
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]} 
                ${disabledStyles}
                ${className}
            `}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
