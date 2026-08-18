import Layout from '@/components/ui/Layout'
import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/content'
import OptimizedImage from '@/components/mdx/OptimizedImage'

export default function Home() {
  const posts = getAllPosts().slice(0, 3) // Show latest 3 posts

  return (
    <Layout>
      <div className="space-y-12 md:space-y-16">
        {/* Hero Section */}
        <section className="text-center py-8 md:py-16 bg-gradient-to-r from-stone-50 to-amber-50 dark:from-stone-900/40 dark:to-amber-900/20 rounded-xl">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <OptimizedImage 
              src="/images/dalle-network-vlh.webp"
              alt="Isometric technical illustration of networked scientific instruments"
              width={1024}
              height={1024}
              className="mx-auto mb-4 md:mb-6 max-w-full sm:max-w-md h-auto rounded-lg"
            />

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Ryan Bartelme, Ph.D.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-100 mb-6 md:mb-8 leading-relaxed">
              Founder of{' '}
              <a
                href="https://informaticedge.com"
                className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-300 underline-offset-4 transition-colors"
              >
                Informatic Edge, LLC
              </a>
              <br className="hidden sm:block" />
              <span className="block sm:inline">Full-stack data scientist specializing in bioinformatics and computational biology</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link 
                href="/blog"
                className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                Read My Blog
              </Link>
              <Link 
                href="/contact"
                className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-2xl md:text-3xl mb-3 md:mb-4">🧬</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">Data Infrastructure</h3>
            <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base">
              Bioinformatics pipelines, database architecture, and cloud platforms built to serve
              real research data at scale.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-2xl md:text-3xl mb-3 md:mb-4">📊</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">Algorithms & AI</h3>
            <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base">
              Custom methods, model development, and the AI ops work that keeps them running
              after the notebook is closed.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-2xl md:text-3xl mb-3 md:mb-4">🎯</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">Consulting & Contracting</h3>
            <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base">
              Have an idea for a project? I scope work through{' '}
              <a
                href="https://informaticedge.com"
                className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors"
              >
                Informatic Edge, LLC
              </a>
              .
            </p>
          </div>
        </section>

        {/* Latest Posts */}
        {posts.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Research & Insights</h2>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base">
                View all posts →
              </Link>
            </div>
            <div className="grid gap-6 md:gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <article className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl shadow-sm border dark:border-gray-600 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                          <span className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {post.title}
                          </span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-200 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{post.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center space-x-4">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span>{post.readingTime}</span>
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag}
                                  className="bg-gray-100 px-2 py-1 rounded text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Keep Reading */}
        <section className="bg-stone-50 dark:bg-stone-900/40 p-6 md:p-12 rounded-xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Keep Reading
          </h2>
          <p className="text-gray-700 dark:text-gray-100 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            New posts on bioinformatics, data science, and the odd self-hosting tangent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/feed.xml"
              className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
            >
              Subscribe via RSS
            </a>
            <a
              href="https://bsky.app/profile/microbialbart.bsky.social"
              className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 px-6 md:px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors font-medium text-sm md:text-base"
            >
              Follow on Bluesky
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}