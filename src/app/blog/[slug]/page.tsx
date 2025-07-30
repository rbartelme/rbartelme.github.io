import Layout from '@/components/ui/Layout'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { mdxComponents } from '@/components/mdx/MDXComponents'

interface BlogPostProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  const post = getPostBySlug(params.slug)
  
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

export default function BlogPost({ params }: BlogPostProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 space-x-6 mb-6">
            <time dateTime={post.date} className="font-medium">
              {formatDate(post.date)}
            </time>
            <span>{post.readingTime}</span>
          </div>
          
          {post.abstract && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">Abstract</h2>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{post.abstract}</p>
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
        
        <footer className="mt-12 pt-8 border-t">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">About the Author</h3>
            <p className="text-gray-600">
              Dr. Ryan Bartelme is the founder and principal data scientist at Informatic Edge, LLC. His expertise spans bioinformatics, data science, 
              microbial ecology, and controlled environment agriculture.
            </p>
          </div>
        </footer>
      </article>
    </Layout>
  )
}