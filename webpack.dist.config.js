var path = require('path')
var webpack = require('webpack')
var TARGET = process.env.TARGET || null

const externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'popper.js': {
    root: 'PopperJS',
    commonjs2: 'popper.js',
    commonjs: 'popper.js',
    amd: 'popper.js',
  },
}

var config = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'index.js',
    sourceMapFilename: 'index.js.map',
    library: 'ReactPopper',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: externals
}

module.exports = config
