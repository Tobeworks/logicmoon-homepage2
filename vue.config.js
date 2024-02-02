const { defineConfig } = require('@vue/cli-service')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
//const { extendDefaultPlugins } = require("svgo");

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Logic Moon Music Home',
    },
  },
  transpileDependencies: true,
  publicPath: './',
  productionSourceMap: process.env.NODE_ENV != 'production',
  configureWebpack: {
    module: {
      rules: [
        // You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
        {
          test: /\.(jpe?g|png)$/i,
          type: "asset",
        },
      ],
    },
    optimization: {
      // minimizer: [
      //   new ImageMinimizerPlugin({
      //     minimizer: {
      //       implementation: ImageMinimizerPlugin.squooshMinify,
      //       options: {
      //         encodeOptions: {
      //           mozjpeg: {
      //             // That setting might be close to lossless, but it’s not guaranteed
      //             // https://github.com/GoogleChromeLabs/squoosh/issues/85
      //             quality: 75,
      //           },
      //           webp: {
      //             lossless: 1,
      //           },
      //           avif: {
      //             // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
      //             cqLevel: 0,
      //           },
      //         },
      //       },
      //     },
      //   }),
      // ],
    },
  },
})
