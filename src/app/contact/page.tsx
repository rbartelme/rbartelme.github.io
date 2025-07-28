import Layout from '@/components/ui/Layout'
import { getPageContent } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Contact - Ryan Bartelme',
  description: 'Get in touch with Dr. Ryan Bartelme for collaboration opportunities, questions, or discussions about bioinformatics and sustainable agriculture.',
}

export default function ContactPage() {
  const pageData = getPageContent('contact')

  if (!pageData) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={pageData.content} components={mdxComponents} />
        </div>
      </div>
    </Layout>
  )
}