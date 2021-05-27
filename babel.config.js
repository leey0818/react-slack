const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: isDevelopment,
        targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: 3,
        shippedProposals: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
