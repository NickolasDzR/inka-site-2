let mix = require("laravel-mix");
require('laravel-mix-extract-media-queries');

mix.extractMediaQueries({
    verbose: false,
    minify: mix.inProduction(),
    combined: true,
    groups: [
        {
            breakpoints: [
                {
                    minWidth: 420,
                    filename: `./dist/css/media-xs`,
                },
                {
                    minWidth: 576,
                    filename: `./dist/css/media-sm`,
                },
                {
                    minWidth: 767,
                    filename: `./dist/css/media-md`,
                },
                {
                    minWidth: 992,
                    filename: `./dist/css/media-lg`,
                },
                {
                    minWidth: 1280,
                    filename: `./dist/css/media-xl`,
                }
            ],
        }
    ]
});
