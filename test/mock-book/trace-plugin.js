"use strict";

const PLUGIN = 'TracePlugin';
const chalk = require('chalk');
const log = console.log;

function header(target, event) {
    const b = chalk.bgBlack;
    const t = chalk.underline.dim;
    const e = chalk.cyan.bold;
    const message =
        `
    ${t(target.toLowerCase())} ${e(event)}
`;

    log(b(message));
}

class Writer {

}


class TracePlugin {
    constructor({ verbose } = {}) {
        this.verbose = verbose || false;
    }

    apply(compiler) {
        compiler.hooks.beforeCompile.tapAsync(PLUGIN, ({ compilationDependencies }, cb) => {
            // compilationDependencies
            // contextModuleFactory + hooks
            // normalModuleFactory + hooks

            header('compiler', 'beforeCompile');

            const n = compilationDependencies.size;
            const dependencies = n === 0
                ? `${chalk.green.bold(n)} dependencies`
                : `${chalk.yellow(n)} dependencies`;

            log(dependencies);

            debugger;
            return cb();
        });
    }
}

module.exports = TracePlugin;
