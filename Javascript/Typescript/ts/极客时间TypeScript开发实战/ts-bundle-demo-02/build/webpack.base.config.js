const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const { CheckerPlugin } = require('awesome-typescript-loader') // 👈 👎👎👎 不好使
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use:[{
          loader: 'ts-loader',
          // loader: 'awesome-typescript-loader', // 👈 👎👎👎 不好使
          options: {
            transpileOnly: true // 只做代码编译，不做类型检查
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    }),
    // new CheckerPlugin() // 👈 👎👎👎 不好使
    new ForkTsCheckerWebpackPlugin()
  ]
}