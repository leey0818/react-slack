const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
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
      '@': path.resolve(__dirname, 'src'),
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
    port: 3000,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    progress: true,
  }
};

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = config;
