let mix = require("laravel-mix");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

mix.webpackConfig({
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/img/",
                        to: "dist/img/",
                    },
                ],
            }),
            new ImageminWebpWebpackPlugin({
                config: [{
                    test: /\.(jpe?g|png|gif)$/i,
                    options: {
                        quality: 100,
                        lossless: false
                    }
                }],
                overrideExtension: true,
                detailedLogs: false,
                silent: true,
            }),
        ],
    },
);
