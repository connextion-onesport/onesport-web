/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
      },
    ],
    domains: [
      'example.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'unsplash.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
