'use client'
import { useState, useEffect } from 'react'

interface SequenceViewerProps {
  sequence?: string
  type?: 'dna' | 'rna' | 'protein'
  showComplement?: boolean
  title?: string
}

export default function SequenceViewer({ 
  sequence = '', 
  type = 'dna', 
  showComplement = false, 
  title 
}: SequenceViewerProps) {
  const [selectedBase, setSelectedBase] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Early return if no sequence provided
  if (!sequence || sequence.length === 0) {
    return (
      <div className="my-6 p-6 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-sm">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No sequence provided
        </div>
      </div>
    )
  }

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getComplement = (base: string): string => {
    const complements: Record<string, string> = {
      'A': type === 'rna' ? 'U' : 'T',
      'T': 'A',
      'U': 'A',
      'G': 'C',
      'C': 'G'
    }
    return complements[base.toUpperCase()] || base
  }

  const getBaseColor = (base: string): string => {
    const colors: Record<string, string> = {
      'A': 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
      'T': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
      'U': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
      'G': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
      'C': 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700'
    }
    return colors[base.toUpperCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600'
  }

  const complement = showComplement && type !== 'protein' 
    ? sequence.split('').map(getComplement).join('')
    : null

  // Mobile-responsive sizing
  const baseSize = isMobile ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'
  const gapSize = isMobile ? 'gap-0.5' : 'gap-1'
  const padding = isMobile ? 'p-4' : 'p-6'

  const handleBaseClick = (index: number) => {
    setSelectedBase(selectedBase === index ? null : index)
  }

  return (
    <div className={`my-6 ${padding} bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-sm`}>
      {title && (
        <h4 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-4 text-gray-900 dark:text-white`}>
          {title}
        </h4>
      )}
      
      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-300 mb-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span>
            {type.toUpperCase()} Sequence ({sequence.length} {type === 'protein' ? 'residues' : 'bases'})
          </span>
          {selectedBase !== null && (
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-900 dark:text-gray-100 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded`}>
              Position {selectedBase + 1}: {sequence[selectedBase]}
              {complement && ` → ${getComplement(sequence[selectedBase])}`}
            </span>
          )}
        </div>
      </div>

      <div className="font-mono space-y-3">
        {/* Original sequence */}
        <div>
          <div className={`flex flex-wrap ${gapSize}`}>
            {sequence.split('').map((base, index) => (
              <button
                key={index}
                onClick={() => handleBaseClick(index)}
                className={`${baseSize} font-bold rounded border-2 cursor-pointer transition-all ${
                  selectedBase === index ? 'border-gray-600 dark:border-gray-400 shadow-md scale-110' : 'border-transparent'
                } ${getBaseColor(base)} hover:shadow-sm hover:scale-105 active:scale-95`}
              >
                {base.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Complement sequence */}
        {complement && (
          <div className="pt-2 border-t dark:border-gray-600">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 mb-2 font-medium`}>
              Complement:
            </div>
            <div className={`flex flex-wrap ${gapSize}`}>
              {complement.split('').map((base, index) => (
                <button
                  key={index}
                  onClick={() => handleBaseClick(index)}
                  className={`${baseSize} font-bold rounded border-2 cursor-pointer transition-all ${
                    selectedBase === index ? 'border-gray-600 dark:border-gray-400 shadow-md scale-110' : 'border-transparent'
                  } ${getBaseColor(base)} hover:shadow-sm hover:scale-105 active:scale-95`}
                >
                  {base.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`mt-4 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400`}>
        Click on any base to see its position{complement && ' and highlight both strands'}.
        {isMobile && (
          <div className="mt-1 text-xs opacity-75">
            Tap and hold for better precision on mobile.
          </div>
        )}
      </div>
    </div>
  )
}