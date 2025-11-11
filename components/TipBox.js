import { Info, AlertTriangle, CheckCircle2, Lightbulb, AlertCircle } from 'lucide-react'

export default function TipBox({ type = 'tip', title, children }) {
  const config = {
    tip: {
      icon: Lightbulb,
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      iconColor: 'text-primary',
      titleColor: 'text-primary',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-contrast/10',
      border: 'border-contrast/30',
      iconColor: 'text-contrast',
      titleColor: 'text-contrast',
    },
    info: {
      icon: Info,
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      iconColor: 'text-primary',
      titleColor: 'text-primary',
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      iconColor: 'text-green-500',
      titleColor: 'text-green-500',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      iconColor: 'text-red-500',
      titleColor: 'text-red-500',
    },
  }

  const style = config[type] || config.tip
  const Icon = style.icon

  return (
    <div className={`${style.bg} ${style.border} border-l-4 rounded-lg p-4 my-6`}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${style.iconColor} mr-3 mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-2 ${style.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-foreground text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

