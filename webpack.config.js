const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'src/popup/index': './src/popup/index.tsx',
    'src/background': './src/background.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [new CopyPlugin([{ from: 'src/**/!(*.ts|*.tsx|*.scss)' }])],
  devServer: {
    writeToDisk: true,
    disableHostCheck: true
  }
};
