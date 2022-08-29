const { defineConfig } = require('@vue/cli-service')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

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
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  "svgo",
                  {
                    plugins: extendDefaultPlugins([
                      {
                        name: "removeViewBox",
                        active: false,
                      },
                      {
                        name: "addAttributesToSVGElement",
                        params: {
                          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                        },
                      },
                    ]),
                  },
                ],
              ],
            },
          },
          generator: [
            {
              // You can apply generator using `?as=webp-100-50`, you can use any name and provide more options
              preset: "jpeg-100-100",
              // implementation: ImageMinimizerPlugin.sharpGenerate,
              implementation: ImageMinimizerPlugin.squooshGenerate,
              options: {
                resize: {
                  enabled: true,
                  width: 500,
                  height: 500,
                },
                encodeOptions: {
                  webp:{
                    quality: 60,
                  },
                  mozjpeg: {
                    quality: 60,
                    resize: {
                      enabled: true,
                      width: 500,
                      height: 500,
                    }
                  },
                },
              },
            },
          ],
        }),
      ],
    }
  },
})
