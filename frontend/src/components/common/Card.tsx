import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  footer?: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glass?: boolean
}

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  hover = false,
  gradient = false,
  glass = false,
}: CardProps) => {
  const baseClasses = 'rounded-2xl overflow-hidden'
  const backgroundClasses = glass
    ? 'glass'
    : gradient
    ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
    : 'bg-white border border-gray-200'
  
  const hoverClasses = hover
    ? 'hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer'
    : 'shadow-soft'
  
  return (
    <div
      className={`
        ${baseClasses}
        ${backgroundClasses}
        ${hoverClasses}
        transition-all duration-300
        ${className}
      `.trim()}
    >
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-gray-100">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="px-6 py-5">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
