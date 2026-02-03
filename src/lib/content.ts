import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { PostMetadata, FullPost, PostFrontmatter, PageFrontmatter } from '@/types/content'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')
const pagesDirectory = path.join(process.cwd(), 'src/content/pages')

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const frontmatter = data as PostFrontmatter
      
      return {
        slug,
        ...frontmatter,
        readingTime: readingTime(content).text,
      }
    })
    .filter(post => process.env.NODE_ENV === 'development' || !post.draft)
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): FullPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as PostFrontmatter

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
    }
  } catch {
    return null
  }
}

export function getPageContent(slug: string): { frontmatter: PageFrontmatter; content: string } | null {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      frontmatter: data as PageFrontmatter,
      content
    }
  } catch {
    return null
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}