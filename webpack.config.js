var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
})
module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react','es2015','stage-3'],
              plugins: ['transform-decorators-legacy']
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractPlugin.extract({
          use: ['css-loader', {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  precss,
                  autoprefixer
                ];
              }
            }
          },
          'sass-loader'
        ]
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: '[name].[ext]',
              outputPath: 'resources/',
              publicPath: 'resources/'
            }
          }
        ]
      }
     

      
      // {
      //   test: /\.js$/,
      //   use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
      //   exclude: /node_modules(?!\/webpack-dev-server)/,
      // }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({      
      Popper: ['popper.js', 'default']
    }),
    ExtractPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'minicart.html',
    //   template: 'src/minicart.html',
    //   chunks: []
    // }),
    new CleanWebpackPlugin(['dist'])
    // new webpack.optimize.UglifyJsPlugin({
    //   ///
    // })
  ]

}