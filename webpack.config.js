// webpack.config.js

const path = require('path')

module.exports = {
   entry: './src/public/src/index.js',
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               "style-loader",
               {
                  loader: "css-loader",
                  options: {
                     sourceMap: true,
                  },
               },
               {
                  loader: "sass-loader",
                  options: {
                     sourceMap: true,
                  },
                  sassOptions: {
                     outputStyle: "compressed",
                  }
               },
               {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/,
               }
            ],
         },
      ]
   },
   resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'src/public/dist'),
   },
}