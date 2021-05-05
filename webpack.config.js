const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "/frontend/private/static/js/index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "/frontend/public/"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: false },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/private/index.html",
      filename: "./index.html",
    }),
  ],
};
