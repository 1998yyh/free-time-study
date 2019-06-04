const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode:'development',
  entry:{
    main:["@babel/polyfill", path.resolve(__dirname, '../src/main.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename:'js/[name].js',
    chunkFilename:'js/[name].[hash:8].js',
    publicPath:'./'
  },
  devServer: {
    hot:true,
    port:3000,
    contentBase:'./dist'
  },
  resolve: {
    alias:{
      vue$:'vue/dist/vue.runtime.esm.js'
    }
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      },
      {
        test:/\.jsx?$/,
        exclude:/node_modules/,
        use:[
          {
            loader:'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader:'style-loader'
          },
          {
            loader:'css-loader',
            options:{
              imortLoaders:2
            }
          },
          {
            loader:'sass-loader',
            options: {
              implementation:require('dart-sass')
            }
          },
          {
            loader:'postcss-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
    ]
  },
  plugins :[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        VUE_APP_BASE_URL: JSON.stringify('http://localhost:3000')
      }
    })
  ]
}