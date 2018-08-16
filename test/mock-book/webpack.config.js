const book = require('./src/book.json');
const path = require('path');
const clean = require('clean-webpack-plugin');

const root = './src';
const out = './dist';

const rootPath = (p) => {
    return path.resolve(root, p + '.md');
};

const pageConvention = (page) => {

    if (typeof page === "string") {
        return {
            "index": rootPath(page),
            "title": page.substring(page.lastIndexOf('/') + 1)
        };
    }

    page.index = rootPath(page.index);

    return page;
};

book.cover = pageConvention(book.cover);
book.license = pageConvention(book.license);
book.pages = book.pages.map(p => {
    return pageConvention(p);
});

const entry = {
    cover: book.cover.index,
    license: book.license.index,
    book: path.resolve(root, 'book.json'),
    styles: path.resolve(root, './styles/global.scss'),
};

book.pages.forEach(p => {
    entry[p.title] = p.index;
});

module.exports = {

    entry,

    plugins: [
        new clean([path.resolve(out)])
    ],

    module: {
        rules: [
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
                        loader: 'img-loader'
                    }
                ]
            }
        ]
    },

    output: {
        path: path.resolve(out),
        filename: '[name].[hash].js'
    }

};
