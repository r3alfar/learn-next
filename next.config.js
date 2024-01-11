/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  webpack: (config) => {
    config.externals.push('bun:sqlite');
    return config;
  },
};
