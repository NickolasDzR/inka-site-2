let mix = require("laravel-mix");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const path = require("path");

mix.webpackConfig({
        plugins: [
            new SVGSpritemapPlugin('src/img/svg/**/*.svg', {
                output: {
                    filename: '../dist/img/sprites/sprite.svg',
                    svgo: true,
                    svg4everybody: true,
                    chunk: { keep: true }
                },
                sprite: {
                    prefix: "",
                }
            }),
        ],
    },
).setPublicPath("dist")

