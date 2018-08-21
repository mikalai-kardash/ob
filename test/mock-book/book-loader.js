const json5 = require('json5');

function getBook(content) {
    try {
        return json5.parse(content);
    }
    catch (e) {
        throw new Error('Error parsing JSON', e);
    }
}

const pagePath = (p) => {
    return (p + '.md');
};

function setPage(page) {

    if (typeof page === "string") {
        return {
            "index": pagePath(page),
            "title": page.substring(page.lastIndexOf('/') + 1)
        };
    }

    page.index = pagePath(page.index);

    return page;
}

function processBook(book) {

    book.cover = setPage(book.cover);
    book.license = setPage(book.license);
    book.pages = book.pages.map(setPage);

    return book;
}

function render(file, api, cb) {
    return new Promise((resolve, reject) => {
        api.resolve(api.context, file, function (err, filename) {
            if (err) {
                reject(err);
                return;
            }

            api.dependency(filename);
            api.loadModule(file, function (err, contents, map, meta) {
                if (err) {
                    reject(err);
                    cb(err);
                    return;
                }

                cb(null, contents, map, meta);
                resolve({ contents, map, meta, filename: file });
            });
        });
    });
}

const getLoadableContent = (book) => {
    return [
        book.cover.index,
        book.license.index,
        // './styles/global.scss'
    ].concat(
        book.pages.map(p => p.index),
    );
};

module.exports = function (contents) {
    console.log('loader - start');

    const api = this;
    const callback = api.async();

    api.cacheable();

    const fixed = processBook(getBook(contents));
    const promises = getLoadableContent(fixed)
        .map(f => render(f, api, function (err, sources, map, module) {
            if (err) {
                callback(err);
                return;
            }

            // callback(null, sources, map, module);
        }));

    Promise
        .all(promises)
        .then(() => { 
            callback(null, JSON.stringify(fixed)); 
            console.log('loader - end');
        })
        .catch(e => callback(e));
}
