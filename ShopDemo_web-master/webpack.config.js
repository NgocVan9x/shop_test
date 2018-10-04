const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('config');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DEV_SERVER_PORT = 4000;

let constants = {};
if (config.util.getEnv('NODE_ENV') === 'production') {
  constants = {
    plugins: {
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    },
    useMinicss: 'style-loader',
  };
} else {
  constants = {
    plugins: {
      filename: '[name].css',
      chunkFilename: '[id].css',
    },
    useMinicss: MiniCssExtractPlugin.loader,
  };
}

const plugins = [
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
  }),
  new MiniCssExtractPlugin({
    filename: `css/${constants.plugins.filename}`,
    chunkFilename: `css/${constants.plugins.chunkFilename}`,
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new CleanWebpackPlugin(['dist'], {
    root: path.join(__dirname, 'public'),
    verbose: true,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(config.util.getEnv('NODE_ENV')),
      BASE_URL: JSON.stringify('http://45.32.121.183:9088/'),
      API_URL: JSON.stringify('http://45.32.121.183:9088/api/'),
    },
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];

if (config.util.getEnv('NODE_ENV') === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
    output: {
      comments: false,
    },
    sourceMap: true,
  }));
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }));
  plugins.push(new OptimizeCSSAssetsPlugin({}));
}
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.jsx',
  },
  output: {
    filename: '[name].bundle.js?t='+ new Date().getTime(),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   default: {
      //     enforce: true,
      //     priority: 1,
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: 2,
      //     name: 'vendors',
      //     enforce: true,
      //     chunks: 'all',
      //   },
      // },
    },
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          constants.useMinicss,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'images/[name].[ext]',
          },
        },
      }, {
        test: /\.(svg|eot|woff|woff2|ttf)(\?.*$|$)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'fonts/[name].[ext]',
          },
        },
      }, {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader',
      },
    ],
  },
  plugins,
  devServer: {
    host: 'localhost',
    inline: true,
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    open: true,
    disableHostCheck: true,
  },
};
