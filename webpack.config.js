var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var js = {
    entry: ['./index.js'],
    output: { filename: './dist/real-map.js' },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html?minimize=false' }
        ],
    }
};

var css = {
    entry: ['./index.css'],
    output: { filename: './tmp/real-map.css' },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }]
    },
    plugins: [
        new ExtractTextPlugin('./dist/real-map.css')
    ]
};

module.exports = [js, css];
