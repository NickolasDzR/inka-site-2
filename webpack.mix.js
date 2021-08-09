let mix = require("laravel-mix");
mix.pug = require("laravel-mix-pug");
const path = require("path");
require('laravel-mix-copy-watched');
require('laravel-mix-extract-media-queries');

if (process.env.section) {
    require(`${__dirname}/webpack.mix.${process.env.section}.js`);
} else {
    mix.alias({
        "%modules%": path.join(__dirname, "src/blocks/modules"),
        "%components%": path.join(__dirname, "src/blocks/components")
    })
        .js("src/js/index.js", "js").version()
        .extract()
        .sass("src/styles/main.scss", "css/main.css").version()
        .extractMediaQueries({
            verbose: false,
            minify: mix.inProduction(),
            combined: true,
            groups: [
                {
                    breakpoints: [
                        {
                            minWidth: 420,
                            filename: `css/media-xs`,
                        },
                        {
                            minWidth: 576,
                            filename: `css/media-sm`,
                        },
                        {
                            minWidth: 767,
                            filename: `css/media-md`,
                        },
                        {
                            minWidth: 992,
                            filename: `css/media-lg`,
                        },
                        {
                            minWidth: 1280,
                            filename: `css/media-xl`,
                        }
                    ],
                }
            ]
        })
        .options({
            processCssUrls: false,
            postCss: [
                require("css-mqpacker"),
            ]
        })
        .pug("src/views/index.pug", "../../dist")
        .copyDirectoryWatched("./src/fonts", "./dist/fonts")
        .setPublicPath("dist")
        .disableNotifications()
        .browserSync({
            server: "./dist/",
            port: 4000,
            watch: true,
        });
}
