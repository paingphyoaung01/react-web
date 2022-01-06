const fs = require("fs")
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const getTimeMilliSecond = function(){
  return new Date().getUTCMilliseconds();
}
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = {}
entry["index"]=[ './src/index']
entry["vendor"]=['@babel/polyfill','moment','react-icons','xlsx','file-saver']

if(process.env.npm_lifecycle_event=="build") {
  let version = new Date().getTime()
  let code = `{"version":"${version}"}`
  fs.writeFileSync("./src/auth/key.json",code)
}


module.exports = {

  mode: "producation",

  entry,

  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/dist'),
    // filename: 'bundle.js',
    publicPath: '/'
  },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
    inline:true,
    port: 8081
  },

  module: {
    rules: [

        // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },

      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.xlsx$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      },
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
    ]
  },
  node: {fs: 'empty'},
  externals: [
    {'./cptable': 'var cptable'},
    {'./jszip': 'jszip'}
 ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /'react-icons'$/),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};