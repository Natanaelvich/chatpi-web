module.exports = {
  images: {
    domains: ['assets.vercel.com','localhost'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
