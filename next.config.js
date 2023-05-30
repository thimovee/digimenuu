/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
    }
}

module.exports = nextConfig
