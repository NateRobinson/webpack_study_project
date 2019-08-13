const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const templateFunction = function(data) {
  var shared = ".ico { background-image: url(I); background-size:Wpx Hpx;}"
    .replace("I", data.spritesheet.image)
    .replace("W", data.spritesheet.width / 2)
    .replace("H", data.spritesheet.height / 2);

  var perSprite = data.sprites
    .map(sprite => {
      return ".ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width / 2)
        .replace("H", sprite.height / 2)
        .replace("X", sprite.offset_x / 2)
        .replace("Y", sprite.offset_y / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};

module.exports = {
  entry: {
    app: "./src/app.js",
  },
  resolve: {
    modules: ["node_modules", "assets/generated"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true, //启用HMR
    compress: true, //对所有服务启用gzip
    overlay: true, //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    open: true, //运行命令之后自动打开浏览器
    port: 3001,
    proxy: {
      "/api": "http://localhost:8081",
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-preset-env")()],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "img/[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "media/[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "font/[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter"),
        },
        loader: "eslint-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "项目模板",
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/assets/sprites"),
        glob: "*.png",
      },
      customTemplates: {
        function_based_template: templateFunction,
      },
      target: {
        image: path.resolve(__dirname, "src/assets/generated/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "src/assets/generated/sprite2.scss"),
            {
              format: "function_based_template",
            },
          ],
          path.resolve(__dirname, "src/assets/generated/sprite.scss"),
        ],
      },
      apiOptions: {
        cssImageRef: "~sprite.png",
      },
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/generated/"],
    }),
  ],
};
