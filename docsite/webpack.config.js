"use strict";

var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require("path");

var paths = [
    "/",
];

module.exports = {
    entry: {
        main: "./site/app.js",
    },

    resolve: {
        alias: {
            'enquiry': path.join(__dirname, '../'),
            'react': path.join(__dirname, '../node_modules', 'react')
        },
    },

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./build/"),
        /* IMPORTANT!
         * You must compile to UMD or CommonJS
         * so it can be required in a Node context: */
        libraryTarget: 'umd'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            query: {
                presets: ["node6", "stage-0", "react"]
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },

    plugins: [
        new StaticSiteGeneratorPlugin('main', paths, {}),
        new CopyWebpackPlugin([{
            from: {
                glob: "css/*css"
            }
        }])
    ],
};