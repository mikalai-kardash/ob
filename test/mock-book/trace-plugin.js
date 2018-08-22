"use strict";

const PLUGIN = 'TracePlugin';
const chalk = require('chalk');
const log = console.log;

function header(target, event) {
    const b = chalk.bgBlack;
    const t = chalk.underline.dim;
    const e = chalk.cyan.bold;
    const message = `${t(target.toLowerCase())} ${e(event)}`;

    log(b(message));
}

function footer() {
    log('');
}

function describeCompilationDependencies(compilationDependencies) {
    const n = compilationDependencies.size;
    const dependencies = n === 0
        ? `${chalk.green.bold(n)} dependencies`
        : `${chalk.yellow(n)} dependencies`;

    log(`  ${dependencies}`);
}

function describeModule(module) {
    log(`  ${module.resource}`);
    log(`  ${module.type}`);
}

class Writer {

}


class TracePlugin {
    constructor({ verbose } = {}) {
        this.verbose = verbose || false;
    }

    apply(compiler) {
        console.log(PLUGIN);
        // compilationDependencies

        // contextModuleFactory
        // + hooks
        // + resolverFactory

        // normalModuleFactory
        // + hooks
        // + ruleSet
        compiler.hooks.beforeCompile.tapAsync(PLUGIN, ({ compilationDependencies }, cb) => {
            header('compiler', 'beforeCompile');
            describeCompilationDependencies(compilationDependencies);
            footer();

            return cb();
        });

        // compilationDependencies

        // contextModuleFactory
        // + hooks
        // + resolverFactory

        // normalModuleFactory
        // + hooks
        // + ruleSet
        compiler.hooks.compile.tap(PLUGIN, ({ compilationDependencies }) => {
            header('compiler', 'compile');
            describeCompilationDependencies(compilationDependencies);
            footer();
        });

        compiler.hooks.afterCompile.tapAsync(PLUGIN, (compilation, cb) => {
            header('compiler', 'afterCompile');

            if (compilation.assets) {
                const asset = chalk.italic.cyan;
                for (const p of Object.keys(compilation.assets)) {
                    log(`  ${asset(p)}`);
                }
            }

            footer();

            return cb();
        });

        // stats
        // + compilation
        // + endTime
        // + hash
        // + startTime
        compiler.hooks.done.tapAsync(PLUGIN, (stats, cb) => {
            header('compiler', 'done');
            footer();
            return cb();
        });

        // compilation
        // params
        // + dependencies
        // + normal module factory
        // + context module factory
        compiler.hooks.thisCompilation.tap(PLUGIN, (compilation, params) => {
            header('compiler', 'thisCompilation');
            footer();

            compilation.hooks.buildModule.tap(PLUGIN, (module) => {
                header('compilation', 'buildModule');
                describeModule(module);
                footer();
            });

            compilation.hooks.rebuildModule.tap(PLUGIN, (module) => {
                header('compilation', 'rebuildModule');
                describeModule(module);
                footer();
            });

            compilation.hooks.succeedModule.tap(PLUGIN, (module) => {
                header('compilation', 'succeedModule');
                describeModule(module);
                footer();
            });

            compilation.hooks.failedModule.tap(PLUGIN, (module, err) => {
                header('compilation', 'failedModule');
                describeModule(module);
                log(`  ${err}`);
                footer();
            });

            // []
            compilation.hooks.finishModules.tap(PLUGIN, (modules) => {
                header('compilation', 'finishModules');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.seal.tap(PLUGIN, () => {
                header('compilation', 'seal');
                footer();
            });

            compilation.hooks.unseal.tap(PLUGIN, () => {
                header('compilation', 'unseal');
                footer();
            });

            compilation.hooks.finishRebuildingModule.tap(PLUGIN, (module) => {
                header('compilation', 'finishRebuildingModule');
                describeModule(module);
                footer();
            });

            compilation.hooks.beforeChunks.tap(PLUGIN, () => {
                header('compilation', 'beforeChunks');
                footer();
            });

            compilation.hooks.afterChunks.tap(PLUGIN, (chunks) => {
                header('compilation', 'afterChunks');
                log(`  ${chunks.length} chunks`);
                footer();
            });

            compilation.hooks.dependencyReference.tap(PLUGIN, (reference, dependency, module) => {
                header('compilation', 'dependencyReference');
                log(`  ${module.resource} > ${dependency.request}`);
                footer();
            });

            compilation.hooks.optimizeDependenciesBasic.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeDependenciesBasic');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.optimizeDependencies.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeDependencies');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.optimizeDependenciesAdvanced.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeDependenciesAdvanced');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.afterOptimizeDependencies.tap(PLUGIN, (modules) => {
                header('compilation', 'afterOptimizeDependencies');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.optimize.tap(PLUGIN, () => {
                header('compilation', 'optimize');
                footer();
            });

            compilation.hooks.optimizeModulesBasic.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeModulesBasic');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.optimizeModules.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeModules');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.optimizeModulesAdvanced.tap(PLUGIN, (modules) => {
                header('compilation', 'optimizeModulesAdvanced');
                log(`  ${modules.length} modules`);
                footer();
            });

            compilation.hooks.afterOptimizeModules.tap(PLUGIN, (modules) => {
                header('compilation', 'afterOptimizeModules');
                log(`  ${modules.length} modules`);
                footer();
            });
        });

        compiler.hooks.compilation.tap(PLUGIN, (compilation, params) => {
            header('compiler', 'compilation');
            footer();
        });

        compiler.hooks.shouldEmit.tap(PLUGIN, (compilation) => {
            header('compiler', 'shouldEmit');
            footer();
        });

        compiler.hooks.additionalPass.tapAsync(PLUGIN, (cb) => {
            header('compiler', 'shouldEmit');
            footer();
            return cb();
        });

        compiler.hooks.beforeRun.tapAsync(PLUGIN, (compiler, cb) => {
            header('compiler', 'beforeRun');
            footer();
            return cb();
        });

        compiler.hooks.run.tapAsync(PLUGIN, (compiler, cb) => {
            header('compiler', 'run');
            footer();
            return cb();
        });

        compiler.hooks.emit.tapAsync(PLUGIN, (compilation, cb) => {
            header('compiler', 'emit');
            footer();
            return cb();
        });

        compiler.hooks.afterEmit.tapAsync(PLUGIN, (compilation, cb) => {
            header('compiler', 'afterEmit');
            footer();
            return cb();
        });

        compiler.hooks.normalModuleFactory.tap(PLUGIN, (factory) => {
            header('compiler', 'normalModuleFactory');
            footer();
        });

        compiler.hooks.contextModuleFactory.tap(PLUGIN, (factory) => {
            header('compiler', 'contextModuleFactory');
            footer();
        });

        compiler.hooks.make.tapAsync(PLUGIN, (compilation, cb) => {
            header('compiler', 'make');
            footer();
            return cb();
        });

        compiler.hooks.failed.tap(PLUGIN, (err) => {
            header('compiler', 'failed');
            footer();
        });
    }
}

// todo: can we compare compilation between events and show diff?
// todo: color coding for diff tapable objects - compiler, compilation, etc.

module.exports = TracePlugin;
