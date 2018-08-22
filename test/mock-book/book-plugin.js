"use strict";

const PLUGIN = "BookPlugin";

// const BookDependency = require('./book-dependency');

class BookPlugin {
    constructor() {}

    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN, compilerCompilation());
        compiler.hooks.make.tapAsync(PLUGIN, compilerMake());
    }
}

function compilerMake(options) {
    return function(compilation, cb) {
        console.log('compiler - make');
        return cb();
    };
}

function compilerCompilation(options) {
    return function(compilation, { normalModuleFactory }) {
        console.log('compiler - compilation');
    };
}

module.exports = BookPlugin;