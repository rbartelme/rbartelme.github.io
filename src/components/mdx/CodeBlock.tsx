interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  lineNumbers?: boolean
}

export default function CodeBlock({ 
  children, 
  language = 'text', 
  title, 
  lineNumbers = false 
}: CodeBlockProps) {
  const lines = children.split('\n')
  
  return (
    <div className="my-6 bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg">
      {title && (
        <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 text-gray-300 dark:text-gray-200 text-sm font-medium border-b border-gray-700 dark:border-gray-800">
          <span className="text-blue-400 dark:text-blue-300">{language}</span>
          {title && <span className="ml-2">• {title}</span>}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-gray-100 dark:text-gray-200 text-sm leading-relaxed`}>
          {lineNumbers ? (
            <div className="flex">
              <div className="text-gray-500 dark:text-gray-400 text-right pr-4 select-none">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1">
                {children}
              </div>
            </div>
          ) : children}
        </code>
      </pre>
    </div>
  )
}