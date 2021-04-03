const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

module .exports={
  entry:path.resolve(__dirname,"./frontend/private/adminpanel/js/app.js"),
  output:{
    path:path.resolve(__dirname,"./frontend/public"),
    filename:"bundle.js"
  },
  mode : 'development',
  module : {
    rules :[
      {
        test : /\.html$/,
        use:[
          {
            loader:"html-loader",
            options:{ minimize : false }
          }
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)/,
        use:['file-loader']
      },
      {
        test:/\.scss$/,
        use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"sass-loader"
          },
        ]
      },

    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./frontend/private/adminpanel/html/index.html",
      filename:"./index.html"
    }),
  ],

  devServer:{
    contentBase:path.resolve(__dirname,"./frontend/public")
  },
}