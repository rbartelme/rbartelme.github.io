interface CitationProps {
  authors: string[]
  title: string
  journal?: string
  year: number
  doi?: string
  url?: string
  id: string
}

export default function Citation({ 
  authors, 
  title, 
  journal, 
  year, 
  doi, 
  url, 
  id 
}: CitationProps) {
  return (
    <div id={`ref-${id}`} className="text-sm mb-4 pl-4 border-l-2 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-r">
      <span className="font-medium text-gray-900 dark:text-gray-100">{authors.join(', ')}</span>
      <span className="text-gray-700 dark:text-gray-300"> ({year}). </span>
      <em className="text-gray-800 dark:text-gray-200">{title}</em>
      {journal && <span className="text-gray-700 dark:text-gray-300">. <strong>{journal}</strong></span>}
      {doi && (
        <span className="text-gray-700 dark:text-gray-300">. DOI: 
          <a href={`https://doi.org/${doi}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-1">
            {doi}
          </a>
        </span>
      )}
      {url && !doi && (
        <span className="text-gray-700 dark:text-gray-300">. 
          <a href={url} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-1">
            Available here
          </a>
        </span>
      )}
    </div>
  )
}

interface InlineCitationProps {
  refId: string
  children: React.ReactNode
}

export function Cite({ refId, children }: InlineCitationProps) {
  return (
    <a 
      href={`#ref-${refId}`} 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
    >
      {children}
    </a>
  )
}