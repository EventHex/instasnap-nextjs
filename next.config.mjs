/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'event-hex-saas.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app-api.eventhex.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.instasnap.live68149714c4b9b3811e79475c',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;