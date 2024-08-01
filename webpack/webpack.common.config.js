const path = require("path");
const { name } = require("../package");
const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("../package.json").dependencies;

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    publicPath: "http://localhost:8888/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-top-level-await",
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", "css", "less"],
    alias: {
      "~": path.resolve(__dirname, "../"), // 根目录
      "@": path.resolve(__dirname, "../src"),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remote.js",
      library: { type: "umd", name: "remote" },
      exposes: {
        './Apple': '@/layouts/Apple'
      },
      // shared: { react: { eager: true }, "react-dom": { eager: true } },
    }),
  ],
};
