import Layout from '@/components/ui/Layout'
import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/content'
import OptimizedImage from '@/components/mdx/OptimizedImage'

export default function Home() {
  const posts = getAllPosts().slice(0, 3) // Show latest 3 posts

  return (
    <Layout>
      <div className="space-y-16">
                {/* Latest Posts */}
        {posts.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Research & Insights</h2>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
                View all posts →
              </Link>
            </div>
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-200 mb-4 leading-relaxed">{post.description}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readingTime}</span>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex space-x-2">
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
              ))}
            </div>
          </section>
        )}
        
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
          <div className="max-w-4xl mx-auto px-8">
            <OptimizedImage 
              src="/images/dalle-landing.png"
              alt="Dr. Ryan Bartelme"
              width={1280}
              height={720}
              className="mx-auto mb-6"
            />


            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ryan Bartelme, Ph.D.
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-100 mb-8 leading-relaxed">
              Founder of <span className="font-semibold text-blue-600">Informatic Edge, LLC</span>
              <br />
              Full-stack data scientist specializing in bioinformatics and computational biology
            </p>
            <div className="flex justify-center space-x-6">
              <Link 
                href="/blog"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Read My Research
              </Link>
              <Link 
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-3xl mb-4">🧬</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Bioinformatics</h3>
            <p className="text-gray-600 dark:text-gray-200">
              Developing computational approaches to understand complex biological systems and solve real-world challenges.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Data Science</h3>
            <p className="text-gray-600 dark:text-gray-200">
              Full-stack data solutions combining statistical thinking, machine learning, and algorithmic innovation.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border dark:border-gray-600">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Consulting & Contracting</h3>
            <p className="text-gray-600 dark:text-gray-200">
              Strategic consulting and project-based solutions for research institutions and biotechnology companies.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 p-12 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Tackle Your Data Challenges?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you need strategic consulting, custom algorithm development, or end-to-end project execution, 
            Informatic Edge combines deep biological expertise with cutting-edge computational methods.
          </p>
          <Link 
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Let's Collaborate
          </Link>
        </section>
      </div>
    </Layout>
  )
}