import { ReactNode } from 'react'

interface AlertProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: ReactNode
}

export default function Alert({ type = 'info', title, children }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-500 text-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-500 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500 text-red-800 dark:text-red-200'
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
          <div className="prose prose-sm dark:prose-invert max-w-none">{children}</div>
        </div>
      </div>
    </div>
  )
}