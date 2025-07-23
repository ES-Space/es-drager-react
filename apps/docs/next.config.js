import process from 'node:process'
import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/es-drager-react' : '',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
})

export default withMDX(nextConfig)
