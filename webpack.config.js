const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/images/[name][ext]',
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'template.html'),
        filename: './index.html',
    }),
    new CopyPlugin({
        patterns: [{ from: 'src/data', to: 'data/' }],
    })],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        port: 3000
    }
}