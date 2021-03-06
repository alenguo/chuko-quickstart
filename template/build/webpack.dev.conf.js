const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// copy from ./webpack.prod.conf.js
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            extract: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    output: {
        path: config.build.assetsRoot,
        // filename: utils.assetsPath('js/[name].[chunkhash].js'),
        // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        // copy from ./webpack.prod.conf.js
        // extract css into its own file
        new ExtractTextPlugin({
            // filename: utils.assetsPath('css/[name].[contenthash].css')
            filename: utils.assetsPath('css/[name].wxss')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf('node_modules') >= 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsRoot + '/static',
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../src/lib'),
                to: config.build.assetsRoot + '/lib',
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../src/tools'),
                to: config.build.assetsRoot + '/tools',
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../src/config'),
                to: config.build.assetsRoot + '/config',
                ignore: ['.*']
            },
            {
              from: path.resolve(__dirname, '../src/images'),
              to: config.build.assetsRoot + '/images',
              ignore: ['.*']
            }
        ]),

        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // }),
        new FriendlyErrorsPlugin(),

        // 编译时清除dist目录
        new CleanWebpackPlugin(
            ['dist/main.*.js', 'dist/manifest.*.js', 'dist/static/js/*.js', 'dist/static/images/*', , 'dist/static/css/*'], 　 //匹配删除的文件
            {
                root: __dirname,  //根目录
                verbose: true,    //开启在控制台输出信息
                dry: true         //启用删除文件
            }
        )
    ]
})
