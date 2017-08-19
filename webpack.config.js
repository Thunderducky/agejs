var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/engine/main.js',
    output: {
        path: path.resolve(__dirname, 'js/build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
