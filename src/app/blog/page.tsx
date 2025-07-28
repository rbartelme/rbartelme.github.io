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
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Blog</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Exploring bioinformatics, data science, and sustainable agriculture through research and practical applications.
          </p>
        </header>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts yet. Check back soon for research insights!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <header className="mb-4">
                  <h2 className="text-2xl font-semibold mb-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime}</span>
                  </div>
                </header>
                
                {post.abstract && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <p className="text-blue-800 text-sm leading-relaxed">{post.abstract}</p>
                  </div>
                )}
                
                <p className="text-gray-600 mb-4 leading-relaxed">{post.description}</p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
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