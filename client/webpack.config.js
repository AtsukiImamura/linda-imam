const path = require("path");

const main = {
  target: "webworker",
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/background/extension.ts",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "extension.js",
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ]
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
    modules: [
      path.resolve('./node_modules')
    ]
  },
};

const front = {
  target: "web",
  // target: "webworker",
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/front/linda.ts",
  output: {
    path: path.join(__dirname, "./media/"),
    filename: "linda.js",
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ]
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
    modules: [
      path.resolve('./node_modules')
    ]
  },
};

module.exports = [main, front]