import Layout from '@/components/ui/Layout'
import { getPageContent } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'About - Ryan Bartelme',
  description: 'Learn about Dr. Ryan Bartelme\'s background in bioinformatics, data science, and sustainable agriculture research.',
}

export default function AboutPage() {
  const pageData = getPageContent('about')

  if (!pageData) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={pageData.content} components={mdxComponents} options={{ blockJS: false }} />
        </div>
      </div>
    </Layout>
  )
}