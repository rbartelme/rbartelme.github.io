import Layout from '@/components/ui/Layout'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/content'

export const metadata = {
  title: 'Blog - Ryan Bartelme',
  description: 'Research insights, bioinformatics tutorials, and data science explorations from Dr. Ryan Bartelme.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Research Blog</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed">
            Exploring bioinformatics, data science, and sustainable agriculture through research and practical applications.
          </p>
        </header>
        
        {posts.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 text-base md:text-lg">No posts yet. Check back soon for research insights!</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl shadow-sm border dark:border-gray-600 hover:shadow-md transition-shadow">
                <header className="mb-3 md:mb-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4 mb-3 md:mb-4">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime}</span>
                  </div>
                </header>
                
                {post.abstract && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-3 md:p-4 mb-3 md:mb-4">
                    <p className="text-blue-800 dark:text-blue-200 text-sm md:text-base leading-relaxed">{post.abstract}</p>
                  </div>
                )}
                
                <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{post.description}</p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}