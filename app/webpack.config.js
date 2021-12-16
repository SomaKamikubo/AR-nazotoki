const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: srcPath,
  mode: 'development',
  entry: './app.js',
  output: {
    path: distPath,
    filename: 'app.js',
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // 設定方法: https://webpack.js.org/plugins/copy-webpack-plugin/
        // from は context からのパス
        {
          context: path.resolve(srcPath, 'static'),
          from: '**/*.*',
          to: distPath,
        },
      ],
    }),
  ],
  devServer: {
    allowedHosts: ['assam.tea.ie.u-ryukyu.ac.jp'],
    webSocketServer: false,
    liveReload: true,
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};