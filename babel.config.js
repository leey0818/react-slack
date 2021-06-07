module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
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
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
};
