const book = require('./src/book.json');
const path = require('path');

const root = './src';

module.exports = {

    entry: {
        cover: path.resolve(root, book.cover + '.md'),
        book: path.resolve(root, 'book.json')
    },

    module: {
        rules: [{
            test: /\.md$/,
            use: [
                {
                    loader: 'html-loader'
                },
                {
                    loader: 'markdown-loader'
                }
            ]
        }]
    }

};
