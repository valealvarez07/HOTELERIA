const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'hoteleria': './app/client/hoteleria.js'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"]
          },
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/, 
          loader: [
            MiniCSSExtractPlugin.loader,
            "css-loader",
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCSSExtractPlugin()
    ]
};