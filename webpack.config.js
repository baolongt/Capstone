const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                },
                minify: true
              })
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],

  devServer: {
    historyApiFallback: true,
    open: true
  }
};
