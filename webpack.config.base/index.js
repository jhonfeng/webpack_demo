const webpack = require('webpack');
const path = require('path');
const config = require('../config.js');
const codeDir = "src";
const buildPath = path.resolve(config.root, codeDir,'dist/base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  devtool: 'eval',
  // 入口配置
  entry: './src/A/index.js',
  output: {
    path: buildPath, // 输出文件路径
    filename: 'app.js', // 输出文件名字
    chunkFilename: '[chunkhash].js' // chunk文件名字
  },
  // Webpack config options on how to obtain modules
  resolve: {
    // 当你reuire时，不需要加上以下扩展名
    extensions: ['.js', '.md', '.txt'],
  },
  devServer: {
    port: '4000',
    inline: true
  },
  plugins: [
    // 防止加载所有地区时刻
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Webpack 2以后内置
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // 碰到错误warning但是不停止编译
    new webpack.NoEmitOnErrorsPlugin(),
    // 生成html文件
    new HtmlWebpackPlugin({ 
        // 输出文件名字及路径
      filename: 'index.html',
      template: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    // webpack2 以后内置配置
    //   {
    //     test: /\.json$/,
    //     use: 'json-loader',
    //   },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: 'style-loader!css-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
     
       {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
      }
    ],
  },
};

module.exports = webpackConfig;
