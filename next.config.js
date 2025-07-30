const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-highlight')],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // No basePath or assetPrefix needed for main GitHub Pages site
}

module.exports = withMDX(nextConfig)