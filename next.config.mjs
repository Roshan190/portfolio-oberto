/**
 * Static export for GitHub Pages.
 * Design system adapted from Juan Oberto's MIT-licensed portfolio:
 * https://github.com/juandgg1611/Portfolio
 */

const basePath = '/portfolio-oberto';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: 'https://roshan190.github.io/portfolio-oberto',
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false,
};

export default nextConfig;
