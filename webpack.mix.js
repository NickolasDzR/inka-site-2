let mix = require("laravel-mix");
mix.pug = require("laravel-mix-pug");
const path = require("path");
require('laravel-mix-copy-watched');
require('laravel-mix-extract-media-queries');
const mqpacker = require("@hail2u/css-mqpacker");
require('laravel-mix-extract-media-queries');

if (process.env.section) {
    require(`${__dirname}/webpack.mix.${process.env.section}.js`);
} else {
    mix.alias({
        "%modules%": path.join(__dirname, "src/blocks/modules"),
        "%components%": path.join(__dirname, "src/blocks/components")
    })
        .js("src/js/index.js", "js")
        .extract()
        .sass("src/styles/main.scss", "css/main.css")
        .options({
            processCssUrls: false,
            postCss: [
                require('postcss-import'),
                require('postcss-purgecss-laravel'),
                mqpacker({
                    sort: true
                })
            ]
        })
        // .extractMediaQueries({
        //     verbose: false,
        //     minify: mix.inProduction(),
        //     combined: true,
        //     groups: [
        //         {
        //             breakpoints: [
        //                 {
        //                     minWidth: 420,
        //                     filename: `../dist/css/media-xs`,
        //                 },
        //                 {
        //                     minWidth: 576,
        //                     filename: `../dist/css/media-sm`,
        //                 },
        //                 {
        //                     minWidth: 767,
        //                     filename: `../dist/css/media-md`,
        //                 },
        //                 {
        //                     minWidth: 992,
        //                     filename: `../dist/css/media-lg`,
        //                 },
        //                 {
        //                     minWidth: 1280,
        //                     filename: `../dist/css/media-xl`,
        //                 }
        //             ],
        //         }
        //     ]
        // })
        .sourceMaps()
        .pug("src/views/index.pug", "../../dist")
        .copyDirectoryWatched("./src/fonts", "./dist/fonts")
        .copyDirectoryWatched("./src/views/index.pug", "./dist/")
        .copyDirectoryWatched("./src/styles/main.scss", "./dist/styles")
        .setPublicPath("dist")
        .disableNotifications()
        .browserSync({
            server: "./dist/",
            port: 4000,
            watch: true,
        });
}

if (mix.inProduction()) {
    mix.version();
}
