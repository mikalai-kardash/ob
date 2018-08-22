"use strict";

const PLUGIN = 'TracePlugin';

class TracePlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.hooks.beforeCompile.tapAsync(PLUGIN, function(params, cb) {
            // compilationDependencies
            // contextModuleFactory + hooks
            // normalModuleFactory + hooks
            console.log(PLUGIN + ' beforeCompile');
            debugger;
            return cb();
        });
    }
}

module.exports = TracePlugin;
