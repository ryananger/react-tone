var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ogg|wav|mp3)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(js|jsx)?/,
        exclude: /(node_modules|assets)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ]
          }
        }
      }
    ]
  }
};