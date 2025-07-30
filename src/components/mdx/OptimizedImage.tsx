import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  className?: string
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  caption, 
  className = "" 
}: OptimizedImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg shadow-sm dark:shadow-gray-700"
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}