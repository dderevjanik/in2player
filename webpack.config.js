const path = require('path');
const Webpack = require('webpack');

const baseConfig = {
  entry: {
    app: './src/Index.tsx',
    video: './src/DemoVideo.tsx'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: __dirname + '/public'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader?configFile="tsconfig.json"',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  plugins: []
};

module.exports = baseConfig;
