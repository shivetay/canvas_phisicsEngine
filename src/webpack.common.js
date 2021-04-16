module.exports = {
  entry: './src/index.js',
  plugins: [],
  module: {
    rules: [
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets',
            publicPath: 'assets',
          },
        },
      },
    ],
  },
};
