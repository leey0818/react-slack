const path = require('path');
const webpack = require('webpack');
const portfinder = require('portfinder');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

const getPort = port => portfinder.getPortPromise({ port });
const getConfig = async () => {
  const config = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: './src/main',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        // '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
          loader: 'file-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'public/index.html' }),
      new ForkTsCheckerWebpackPlugin({ async: false }),
      new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: await getPort(8080),
      hot: true,
      historyApiFallback: true,
      overlay: true,
      progress: true,
      proxy: {
        '/api': {
          target: process.env.BACKEND_HOST,
          changeOrigin: true,
        },
      },
    },
  };

  if (isDevelopment) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};

module.exports = getConfig();
