'use client'
import { useState } from 'react'

type Corpus = 'scicueval' | 'mmlu'

interface MapperViewerProps {
  corpus: Corpus
  defaultEncoder?: string
  encoders?: string[]
  height?: number
  mobileHeight?: number
}

const CORPUS_LABEL: Record<Corpus, string> = {
  scicueval: 'SciCUEval',
  mmlu: 'MMLU non-STEM',
}

const DEFAULT_ENCODERS: string[] = [
  'medcpt-query',
  'bioformer-8l',
  'biomedbert-abstract',
  'biomedbert-fulltext',
  'scibert',
  'clinicalbert',
  'specter2',
  'bge-base',
  'bge-small',
  'arctic-embed-m',
  'minilm',
  'e5-base-v2',
  'nomic-embed-v1.5',
  'embeddinggemma',
  'embeddinggemma-prescribed',
]

export default function MapperViewer({
  corpus,
  defaultEncoder = 'medcpt-query',
  encoders = DEFAULT_ENCODERS,
  height = 640,
  mobileHeight = 480,
}: MapperViewerProps) {
  const [encoder, setEncoder] = useState(defaultEncoder)
  const src = `/mapper/${corpus}/${encoder}.html`
  const selectId = `mapper-${corpus}-encoder`

  return (
    <div className="my-8 w-full max-w-full rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
          {CORPUS_LABEL[corpus]}
        </span>
        <label htmlFor={selectId} className="text-sm text-gray-700">
          Encoder:
        </label>
        <select
          id={selectId}
          value={encoder}
          onChange={(e) => setEncoder(e.target.value)}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
        >
          {encoders.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-blue-600 hover:underline"
        >
          open in new tab ↗
        </a>
      </div>
      <iframe
        key={src}
        src={src}
        title={`KeplerMapper graph: ${encoder} on ${CORPUS_LABEL[corpus]}`}
        loading="lazy"
        className="block w-full rounded border border-gray-200"
        style={{ height: `clamp(${mobileHeight}px, 80vh, ${height}px)` }}
      />
    </div>
  )
}
