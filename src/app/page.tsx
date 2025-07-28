import Layout from '@/components/ui/Layout'
import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/content'

export default function Home() {
  const posts = getAllPosts().slice(0, 3) // Show latest 3 posts

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Ryan Bartelme, Ph.D.
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Bioinformatic Scientist at <span className="font-semibold text-green-600">Pivot Bio</span>
              <br />
              Creating sustainable solutions for agricultural, medical, and environmental big data challenges
            </p>
            <div className="flex justify-center space-x-6">
              <Link 
                href="/blog"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Read My Research
              </Link>
              <Link 
                href="/about"
                className="border-2 border-gray-300 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium"
              >
                About Me
              </Link>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="text-3xl mb-4">🧬</div>
            <h3 className="text-xl font-semibold mb-3">Bioinformatics</h3>
            <p className="text-gray-600">
              Developing computational approaches to understand complex biological systems and agricultural challenges.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Data Science</h3>
            <p className="text-gray-600">
              Applying statistical thinking and machine learning to extract insights from biological and agricultural data.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="text-3xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-3">Sustainable Agriculture</h3>
            <p className="text-gray-600">
              Working on nitrogen solutions and sustainable practices for modern agriculture at Pivot Bio.
            </p>
          </div>
        </section>

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
                <article key={post.slug} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{post.description}</p>
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

        {/* Call to Action */}
        <section className="bg-blue-50 p-12 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Collaboration?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            I'm always excited to discuss bioinformatics challenges, sustainable agriculture solutions, 
            and data science applications in biological systems.
          </p>
          <Link 
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </section>
      </div>
    </Layout>
  )
}