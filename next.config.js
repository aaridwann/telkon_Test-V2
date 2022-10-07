/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['i.pinimg.com','avatars.githubusercontent.com']
  }
}

module.exports = nextConfig
