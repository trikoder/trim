const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProduction = process.env.NODE_ENV === 'production';
const currentVersion = require('./package.json').version;

module.exports = {

    mode: isProduction ? 'production' : 'development',

    entry: './demo/main.js',

    output: {
        path: isProduction
            ? path.resolve(__dirname, 'docs/demo') + '/'
            : path.resolve(__dirname, 'dist') + '/'
        ,
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
                    'postcss-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './src/scss/library/_all.scss',
                                './demo/scss/_variables.scss'
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'src/demo'),
                    path.join(__dirname, 'spec'),
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'src/demo')
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    resolve: {

        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'trim': path.join(__dirname, 'src/js'),
            'apiServer': path.join(__dirname,  process.env.CLIENT_API_ENABLED
                ? 'server/client.js'
                : 'server/nodePlaceholder.js'
            )
        },

        extensions: ['*', '.js', '.vue', '.json']

    },

    devServer: {
        historyApiFallback: true,
        noInfo: false,
        overlay: true
    },

    performance: {
        hints: false
    },

    plugins: [

        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                BASE_URL: JSON.stringify(process.env.BASE_URL),
                BASE_API_URL: JSON.stringify(process.env.BASE_API_URL),
                NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
                PACKAGE_VERSION: JSON.stringify(currentVersion)
            }
        }),

        new HtmlWebpackPlugin({
            template: 'demo/index.template.html',
            filename: 'index.html',
            chunksSortMode: 'none'
        })

    ]

};
