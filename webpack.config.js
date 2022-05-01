const path = require("path");

module.exports = {
  target: "node",
  //   watch: true,
  mode: "development",
  devtool: "inline-source-map",
  entry: "./client/src/extention.ts",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "extention.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  //   externals: ["axios"],
  resolve: {
    extensions: [".ts", ".js", ".vue", ".scss"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  // node: {
  //   fs: "empty",
  //   net: "empty"
  // }
};
