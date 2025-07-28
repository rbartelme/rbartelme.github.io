'use client'
import { useState } from 'react'

interface SequenceViewerProps {
  sequence: string
  type?: 'dna' | 'rna' | 'protein'
  showComplement?: boolean
  title?: string
}

export default function SequenceViewer({ 
  sequence, 
  type = 'dna', 
  showComplement = false, 
  title 
}: SequenceViewerProps) {
  const [selectedBase, setSelectedBase] = useState<number | null>(null)

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
      'A': 'bg-red-100 text-red-800 border-red-200',
      'T': 'bg-blue-100 text-blue-800 border-blue-200',
      'U': 'bg-blue-100 text-blue-800 border-blue-200',
      'G': 'bg-green-100 text-green-800 border-green-200',
      'C': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[base.toUpperCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const complement = showComplement && type !== 'protein' 
    ? sequence.split('').map(getComplement).join('')
    : null

  return (
    <div className="my-6 p-6 bg-white border rounded-lg shadow-sm">
      {title && <h4 className="font-semibold text-lg mb-4">{title}</h4>}
      
      <div className="text-sm text-gray-600 mb-4">
        {type.toUpperCase()} Sequence ({sequence.length} {type === 'protein' ? 'residues' : 'bases'})
        {selectedBase !== null && (
          <span className="ml-4 font-medium">
            Position {selectedBase + 1}: {sequence[selectedBase]}
            {complement && ` → ${getComplement(sequence[selectedBase])}`}
          </span>
        )}
      </div>

      <div className="font-mono space-y-2">
        <div className="flex flex-wrap gap-1">
          {sequence.split('').map((base, index) => (
            <button
              key={index}
              onClick={() => setSelectedBase(selectedBase === index ? null : index)}
              className={`w-8 h-8 text-sm font-bold rounded border-2 cursor-pointer transition-all ${
                selectedBase === index ? 'border-gray-600 shadow-md' : 'border-transparent'
              } ${getBaseColor(base)} hover:shadow-sm`}
            >
              {base.toUpperCase()}
            </button>
          ))}
        </div>

        {complement && (
          <div className="flex flex-wrap gap-1 pt-2 border-t">
            <span className="text-xs text-gray-500 w-full mb-1">Complement:</span>
            {complement.split('').map((base, index) => (
              <div
                key={index}
                className={`w-8 h-8 text-sm font-bold rounded border flex items-center justify-center ${
                  selectedBase === index ? 'border-gray-600 shadow-md' : 'border-transparent'
                } ${getBaseColor(base)}`}
              >
                {base.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Click on any base to see its position{complement && ' and complement'}.
      </div>
    </div>
  )
}