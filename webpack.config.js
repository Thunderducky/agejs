var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
      test: './client/js/engine/test.js',
      main:'./client/js/engine/main.js'
    },
    output: {
        path: path.resolve(__dirname, './server/public/js/'),
        filename: '[name].bundle.js'
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
