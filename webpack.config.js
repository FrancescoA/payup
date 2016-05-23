var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var findPath = function(path_name) {
  return path.join(__dirname, path_name)
};

module.exports = {
  entry: ['./src/main.js', './src/stylesheets/main.scss'],
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        include: findPath('src'),
        loader: ExtractTextPlugin.extract(['css', 'sass'].join('!'))
      }
    ]
  },
  devServer: {
    contentBase: findPath('build'),
    hot: true,
    inline: true,
    progress: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('main.css')
  ]
};