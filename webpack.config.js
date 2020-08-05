const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");


module.exports = {
  entry: {
    'docsify-gltfexplorer': './src/index.js',
    'docsify-gltfexplorer.min': './src/index.js',
    'docsify-iframe': './src/explorer.js',
    'docsify-iframe.min': './src/explorer.js',
    'styles': './css/iframe.css',
  },
  module: {
    rules: [
      {test: /\.css$/,
       use: [MiniCssExtractPlugin.loader,"css-loader"]
      }
    ]
  },
  plugins: [
     new CleanWebpackPlugin(),
     new MiniCssExtractPlugin({filename: "docsify-iframe.min.css"}),
     new FixStyleOnlyEntriesPlugin(),
     new OptimizeCSSAssetsPlugin({})
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/
    })],
  },
};