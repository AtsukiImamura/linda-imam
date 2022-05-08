const path = require("path");
const { VueLoaderPlugin } = require('vue-loader')

const main = {
  target: "node", // webworker
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

const test = {
  target: "node", // webworker
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/background/test.ts",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "test.js",
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
  mode: "development",
  // devtool: "inline-source-map",
  entry: "./src/front/linda.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "linda.js"
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
        test: /\.vue/,
        loader: "vue-loader"
      },
      // {
      //   test: /\.js/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      //   query: {
      //     presets: ["es2015"]
      //   }
      // },
      {
        test: /\.css/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss/,
        use: [
          //   { loader: MiniCssExtractPlugin.loader },
          {
            loader: "vue-style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true
              //   minimize: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve(
                __dirname,
                "./src/resources/sass/_variables.scss"
              )
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js", ".vue", ".scss"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },

  plugins: [new VueLoaderPlugin()],
  // node: {
  //   fs: "empty",
  //   net: "empty"
  // }
};

module.exports = [main, front, test]