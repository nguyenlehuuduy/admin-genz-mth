/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mygenzmentalheath.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
}

module.exports = nextConfig
