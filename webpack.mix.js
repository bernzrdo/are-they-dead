const mix = require('laravel-mix')

mix.disableSuccessNotifications()

mix.options({
    manifest: false,
    publicPath: 'public'
})

mix.sass('src/scss/main.scss', 'public/style.css')
mix.ts('src/ts/main.ts', 'public/script.js')