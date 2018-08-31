"use strict";

const path = require('path');
const BookPlugin = require('./book-plugin');
const TracePlugin = require('./trace-plugin');
const plugin2 = require('build-plugin-tracer');

console.log(plugin2);

module.exports = {

    entry: {
        book: './src/book.json'
    },

    target: 'web',

    plugins: [
        new BookPlugin(),
        new TracePlugin(),
        new plugin2(),
    ],

    module: {
        rules: [
            {
                test: /book\.json$/i,
                type: 'json',
                use: [
                    {
                        loader: './book-loader.js',
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.md$/i,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader'
                    }
                ]
            },
            {
                test: /\.(png|gif|svg|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader?limit=5000'
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-optipng')({}),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },

    output: {
        path: path.resolve('./dist'),
        filename: '[name].[hash].js'
    }
};
