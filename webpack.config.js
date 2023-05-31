import {promises as fs} from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';
const isProduction = process.env.NODE_ENV === 'production';
const currentVersion = JSON.parse(await fs.readFile(new URL('./package.json', import.meta.url), 'utf8')).version;

export default {

    mode: isProduction ? 'production' : 'development',

    entry: './demo/main.js',

    output: {
        path: isProduction
            ? new URL('docs/demo', import.meta.url).pathname + '/'
            : new URL('dist', import.meta.url).pathname + '/',
        filename: 'js/demo.[hash].js',
        publicPath: isProduction ? '/trim/demo/' : '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `
                                @import 'demo/scss/variables';
                                @import 'src/scss/library/all';
                            `
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    new URL('src', import.meta.url).pathname,
                    new URL('src/demo', import.meta.url).pathname
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    resolve: {

        alias: {
            vue: '@vue/compat',
            trim: new URL('src/js', import.meta.url).pathname,
            apiServer: new URL(process.env.CLIENT_API_ENABLED
                ? 'server/client.js'
                : 'server/nodePlaceholder.js'
            , import.meta.url).pathname
        }

    },

    devServer: {
        historyApiFallback: true
    },

    performance: {
        hints: false
    },

    plugins: [

        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.BASE_API_URL': JSON.stringify(process.env.BASE_API_URL),
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            'process.env.PACKAGE_VERSION': JSON.stringify(currentVersion),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        }),

        new HtmlWebpackPlugin({
            template: 'demo/index.template.html',
            filename: 'index.html',
            chunksSortMode: 'none'
        })

    ]

};
