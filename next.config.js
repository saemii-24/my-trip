const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx', 'js', 'jsx'],
  experimental: {
    mdxRs: true,
  },
  // webpack: (config, { isServer, dev }) => {
  //   if (isServer && dev && !global.__MSW_STARTED__) {
  //     // 동적 import로 안전하게 처리
  //     import('./src/mocks/server.js')
  //       .then(({ server }) => {
  //         console.log('🚀 MSW 서버 시작...');
  //         server.listen();
  //         global.__MSW_STARTED__ = true;
  //         console.log('✅ MSW 서버 시작됨');
  //       })
  //       .catch((error) => {
  //         console.log('⚠️ MSW 파일을 찾을 수 없음:', error.message);
  //       });
  //   }
  //   return config;
  // },
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
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'opendata.mofa.go.kr',
        port: '8444',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withMDX(nextConfig);
