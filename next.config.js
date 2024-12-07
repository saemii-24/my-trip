// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/test',
        destination: 'https://localhost:3000/test',
      },
    ];
  },
};

module.exports = nextConfig;
