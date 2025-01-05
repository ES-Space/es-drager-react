import process from 'node:process'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/es-drager-react/' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
