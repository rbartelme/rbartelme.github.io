import Layout from '@/components/ui/Layout'
import { getPageContent } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Projects - Ryan Bartelme',
  description: 'Explore Dr. Ryan Bartelme\'s current and past research projects in bioinformatics, sustainable agriculture, and computational biology.',
}

export default function ProjectsPage() {
  const pageData = getPageContent('projects')

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