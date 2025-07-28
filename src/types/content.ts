export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
  draft?: boolean
  abstract?: string
}

export interface PostMetadata extends PostFrontmatter {
  slug: string
  readingTime: string
}

export interface FullPost extends PostMetadata {
  content: string
}

export interface PageFrontmatter {
  title: string
  description: string
  lastModified?: string
}