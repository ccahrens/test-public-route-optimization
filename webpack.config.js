const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const info = {
  TITLE: 'Test Public Page'
}

const config = {
  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            experimentalWatchApi: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(ico|png)$/i,
        use: ['file-loader'],
      },
    ]
  },

  resolve: {
    extensions: [
      '.tsx', '.ts', '.js', '.jsx', '.json'
    ]
  },

  entry: {
    main: './index.tsx'
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  plugins: [
    new ProgressBarPlugin({ width: 80 }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: info.TITLE,
      chunks: ['main'],
      template: './index.html',
      templateParameters: { TITLE: info.TITLE },
      favicon: './src/img/favicon.ico'
    }),
  ],
}

module.exports = [ config ];