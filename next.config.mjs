

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'el',
    locales: ['en', 'el'],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    basicURLPath: 'https://arctouros.ict.ihu.gr/',
    locales: ['en', 'el']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://arctouros.ict.ihu.gr/api/:path*',
      },
    ];
  }
};

export default nextConfig;
