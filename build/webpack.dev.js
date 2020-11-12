const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        host: "0.0.0.0",
        port: '3000', // 默认是8080
        quiet: false, // 默认不启用
        inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: 'errors-only', // 终端仅打印 error
        overlay: false, // 默认不启用
        clientLogLevel: 'silent', // 日志等级
        compress: true, // 是否启用 gzip 压缩
    }
})