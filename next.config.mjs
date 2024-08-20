

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'el',
    locales: ['en', 'el'],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    basicURLPath: 'http:///127.0.0.1:8000/',
    localURLPath: 'http://127.0.0.1:8000/',
    locales: ['en', 'el'],
    isDebugging: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http:///127.0.0.1:8000/v1/:path*',
      },
      {
        source: '/local-run/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ];
  }
};

export default nextConfig;
