/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farrel-nextjs-demo-users-image.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig

// module.exports = {
//   webpack: (config) => {
//     config.externals.push('bun:sqlite');
//     return config;
//   },
//   nextConfig
// };
