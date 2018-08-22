"use strict";

const PLUGIN = "BookPlugin";

// const BookDependency = require('./book-dependency');

class BookPlugin {
    constructor() {}

    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN, compilerCompilation());
        compiler.hooks.make.tapAsync(PLUGIN, compilerMake());

        compiler.hooks.beforeCompile.tapAsync(PLUGIN, (compilation, cb) => {
            console.log('compiler - beforeCompile');

            return cb();
        });

        compiler.hooks.entryOption.tap(PLUGIN, () => {
            console.log('compiler - entryOption');
        });

        compiler.hooks.shouldEmit.tap(PLUGIN, () => {
            console.log('compiler - shouldEmit');
        });
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

        compilation.hooks.buildModule.tap(PLUGIN, () => {
            console.log('compilation - buildModule');
            
        });

        compilation.hooks.succeedModule.tap(PLUGIN, () => {
            console.log('compilation - succeedModule ');
        });

        compilation.hooks.finishModules.tap(PLUGIN, () => {
            console.log('compilation - finishModules ');
        });
    };
}

module.exports = BookPlugin;