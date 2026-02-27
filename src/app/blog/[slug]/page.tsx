import Layout from '@/components/ui/Layout'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { mdxComponents } from '@/components/mdx/MDXComponents'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) return {}
  
  return {
    title: `${post.title} - Ryan Bartelme`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Ryan Bartelme'],
      tags: post.tags,
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto px-4 md:px-0">
        <header className="mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-300 space-y-2 sm:space-y-0 sm:space-x-6 mb-4 md:mb-6 text-sm md:text-base">
            <time dateTime={post.date} className="font-medium">
              {formatDate(post.date)}
            </time>
            <span>{post.readingTime}</span>
          </div>
          
          {post.abstract && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-4 md:p-6 mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2 md:mb-3">Abstract</h2>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed text-sm md:text-base">{post.abstract}</p>
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* IMPORTANT: This is where D3 plots will be rendered - added responsive wrapper */}
        <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none overflow-x-auto">
          <MDXRemote source={post.content} components={mdxComponents} options={{ blockJS: false }} />
        </div>
        
        <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">About the Author</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              Dr. Ryan Bartelme is the founder and principal data scientist at Informatic Edge, LLC. His expertise spans bioinformatics, data science, 
              microbial ecology, and controlled environment agriculture.
            </p>
          </div>
        </footer>
      </article>
    </Layout>
  )
}