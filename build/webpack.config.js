const path = require('path')
const pathResolve = target => path.resolve(__dirname, '../', target)
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: pathResolve('src/main.js'),
    output: {
        path: pathResolve('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: pathResolve('public/index.html'),
            filename: 'index.html'
        })
    ]
}