var webpack = require('webpack');

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/dev-server',
          './src/index.jsx'],
  output: {
    path: './lib/app/public',
    filename: 'app.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
      { test: /\.js$/, loader: "babel-loader", exclude: '/node_modules/' },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader', "babel-loader"] }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

