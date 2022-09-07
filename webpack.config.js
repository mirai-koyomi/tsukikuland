const Webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    devServer: {
      // webpack-dev-serverの公開フォルダ
      // contentBase: `${__dirname}/public`,
      historyApiFallback: true
    },
    // モジュールバンドルを行う起点となるファイルの指定
    // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
    // 下記はオブジェクトとして指定した例
    entry: {
      app: ['./client/index.tsx'],
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : undefined,
    output: {
      // モジュールバンドルを行った結果を出力する場所やファイル名の指定
      // "__dirname"はこのファイルが存在するディレクトリを表すnode.jsで定義済みの定数
      path: argv.mode === 'production' ? `${__dirname}/public/` : `${__dirname}/public`,
      publicPath: argv.mode === 'production' ? '/tsukikuland/' : '/',
      filename: '[name].js', // [name]はentryで記述した名前(この例ではbundle）が入る
    },
    // モジュールとして扱いたいファイルの拡張子を指定する
    // 例えば「import Foo from './foo'」という記述に対して"foo.ts"という名前のファイルをモジュールとして探す
    // デフォルトは['.js', '.json']
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    },
    // モジュールに適用するルールの設定（ここではローダーの設定を行う事が多い）
    module: {
      rules: [
        {
          // 拡張子が.tsで終わるファイルに対して、TypeScriptコンパイラを適用する
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: argv.mode === 'development',
                importLoaders: 2,
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: argv.mode === 'development',
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    new Autoprefixer({
                      grid: true,
                    }),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: argv.mode === 'development',
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 500 * 1024, // 100KB以上だったら埋め込まずファイルとして分離する
                name: `./public/img/[hash].[ext]`,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: "html-loader"
        }
      ],
    },
    plugins: [
      new Webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      }),
      new HtmlWebpackPlugin({
        template: "./client/src/html/index.html"
      }),
    ],
  }
};
