/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",

  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = nextConfig;
