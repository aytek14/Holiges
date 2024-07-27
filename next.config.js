// Importing the PWA package to wrap the Next.js config
const withPWA = require('next-pwa')({
    dest: 'public', // Specifies where to store the service worker and related files
    disable: process.env.NODE_ENV === 'development', // Disables PWA features during development
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['example.com'], // Customize to include domains you are serving images from
    },
    // You can add more Next.js config options here as needed
  };
  
  // Wrapping the entire Next.js configuration with the PWA plugin
  module.exports = withPWA(nextConfig);