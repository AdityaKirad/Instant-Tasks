/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withPWA = require('@imbios/next-pwa')({
  dest: "public",
  disable: process.env.NODE_ENV === 'development'
})
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
