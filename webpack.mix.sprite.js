let mix = require("laravel-mix");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

mix.webpackConfig({
        plugins: [
            new SVGSpritemapPlugin('src/img/svg/**/*.svg', {
                output: {
                    filename: 'img/sprites/sprite.svg',
                    svgo: true,
                    svg4everybody: true,
                },
                sprite: {
                    prefix: "",
                }
            }),
        ],
    },
).setPublicPath("dist")

