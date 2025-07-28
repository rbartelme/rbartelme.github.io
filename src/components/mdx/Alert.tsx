import { ReactNode } from 'react'

interface AlertProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: ReactNode
}

export default function Alert({ type = 'info', title, children }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800'
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  }

  return (
    <div className={`my-6 border-l-4 p-4 rounded-r-lg ${styles[type]}`}>
      <div className="flex items-start">
        <span className="text-lg mr-3">{icons[type]}</span>
        <div className="flex-1">
          {title && <div className="font-semibold mb-2">{title}</div>}
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    </div>
  )
}