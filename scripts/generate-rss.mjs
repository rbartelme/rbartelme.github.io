// Reads all MDX blog posts and builds RSS feed,
// Writes to public/feed.xml
// Feed gets included in the static export

import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- Configuration ---
// Match metadata in src/app/layout.tsx
const SITE_URL = 'https://rbartelme.github.io'
const SITE_TITLE = 'Ryan Bartelme - Computational Biologist & Data Scientist'
const SITE_DESCRIPTION = 'Bioinformatics research, data science insights, and computational biology from Dr. Ryan Bartelme'

// --- Read all MDX posts ---
// Mirrors logic in src/lib/content.ts:getAllPosts()
// cannot import the TypeScript Directly
// Node.js won't interpret the path aliases at build

const postsDirectory = path.join(process.cwd(), 'src/content/posts')
const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

const posts = fileNames
    .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        const raw = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')
        const { data, content } = matter(raw)
        return { slug, content, ...data}
    })
    // Filter out any drafts
    .filter(post => !post.draft)
    // Sort to newest first
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// --- Build the RSS Feed ---
// Feed constructor takes metadata about the site
// This is used to create the <channel> element in RSS and the <feed> element in Atom.

const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} Ryan Bartelme`,
    author: {
        name: 'Ryan Bartelme',
        link: SITE_URL,
    },
})

// --- Add each post as an item ---
// Each post becomes an <item> in RSS or an <entry> in Atom.

for (const post of posts) {
    // blog slugs
    const url = `${SITE_URL}/blog/${post.slug}/`

    feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.description,
        content: post.content,
        date: new Date(post.date),
        category: (post.tags || []).map(tag => ({ name: tag})),
    })

}

// --- Write RSS XML output ---
// feed.rss2() returns a string of valid RSS 2.0 XML
// Write to public/ to include in Next.js static export

fs.writeFileSync(path.join(process.cwd(), 'public/feed.xml'), feed.rss2(), 'utf8')

console.log(`RSS Feed generated with ${posts.length} posts -> public/feed.xml`)

