"use strict";

const PLUGIN = 'TracePlugin';
const chalk = require('chalk');
const log = console.log;

const DEFAULT_OPTIONS = {
    verbose: true,
    trace: {
        compiler: {
            // all: true,
            // beforeCompile: true,
            // compile: true,
            // afterCompile: true,
            // done: true,
            // thisCompilation: true,
            // compilation: true,
            // shouldEmit: true,
            // additionalPass: true,
            // beforeRun: true,
            // run: true,
            // emit: true,
            // afterEmit: true,
            // normalModuleFactory: true,
            // contextModuleFactory: true,
            // make: true,
            // failed: true
        },
        compilation: {
            all: true,
        },
    }
};

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

const noop = function () { };

class HookMaster {
    constructor(name) {
        this.name = name;
    }

    handle(hook, { async, context } = {}, enabled) {
        if (!hook) return noop;
        if (!enabled) return noop;

        const options = {
            async,
            name: this.name
        };

        return (function (h, c, o) {

            let handler = noop;

            try {
                if (o.async) {

                    h.tapAsync(o.name, function () {
                        handler.apply(c, arguments);
                        return arguments[arguments.length - 1]();
                    });

                } else {

                    h.tap(o.name, function () {
                        handler.apply(c, arguments);
                    });

                }
            } catch (e) {
                throw new Error(`Unable to set handler on ${o.name}: ${e}.\nPossibly sync vs async hook problem.`);
            }

            return function (fn) { handler = fn; };

        })(hook, context, options);
    }

    sync(hook, context, enabled) {
        return this.handle(hook, {
            async: false,
            context,
        }, enabled);
    }

    async(hook, context, enabled) {
        return this.handle(hook, {
            async: true,
            context,
        }, enabled);
    }
}

class TraceCompilation extends HookMaster {
    constructor({ verbose, trace }, plugin) {
        super(PLUGIN);

        this.verbose = verbose;
        this.trace = trace;
        this.plugin = plugin;

        this.compilation = {};
    }

    options(handlerOptions) {
        return {
            verbose: this.verbose,
            options: handlerOptions,
            plugin: this.plugin,
            tracer: this,
        };
    }

    apply(compilation) {
        const syncHooks = [
            'buildModule',
            'rebuildModule',
            'failedModule',
            'succeedModule',
            'dependencyReference',
            'finishModules',
            'finishRebuildingModule',
            'unseal',
            'seal',
            'beforeChunks',
            'afterChunks',
            'optimizeDependenciesBasic',
            'optimizeDependencies',
            'optimizeDependenciesAdvanced',
            'afterOptimizeDependencies',
            'optimize',
            'optimizeModulesBasic',
            'optimizeModules',
            'optimizeModulesAdvanced',
            'afterOptimizeModules',
            'optimizeChunksBasic',
            'optimizeChunks',
            'optimizeChunksAdvanced',
            'afterOptimizeChunks',
            'afterOptimizeTree',
            'optimizeChunkModulesBasic',
            'optimizeChunkModules',
            'optimizeChunkModulesAdvanced',
            'afterOptimizeChunkModules',
            'shouldRecord',
            'reviveModules',
            'optimizeModuleOrder',
            'advancedOptimizeModuleOrder',
            'beforeModuleIds',
            'moduleIds',
            'optimizeModuleIds',
            'afterOptimizeModuleIds',
            'reviveChunks',
            'optimizeChunkOrder',
            'beforeChunkIds',
            'optimizeChunkIds',
            'afterOptimizeChunkIds',
            'recordModules',
            'recordChunks',
            'beforeHash',
            'contentHash',
            'afterHash',
            'recordHash',
            'record',
            'beforeModuleAssets',
            'shouldGenerateChunkAssets',
            'beforeChunkAssets',
            'additionalChunkAssets',
            'afterOptimizeChunkAssets',
            'afterOptimizeAssets',
            'needAdditionalSeal',
            'chunkHash',
            'moduleAsset',
            'chunkAsset',
            'assetPath',
            'needAdditionalPass',
            'childCompiler',
        ];

        const asyncHooks = [
            'optimizeTree',
            'additionalAssets',
            'optimizeChunkAssets',
            'optimizeAssets',
            'afterSeal',
        ];

        for (const syncHook of syncHooks) {
            if (!compilation.hooks[syncHook]) {
                continue;
            }

            this.compilation[syncHook] = this.sync(
                compilation.hooks[syncHook],
                this.options(this.trace.compilation[syncHook]),
                this.trace.compilation.all || this.trace.compilation[syncHook]
            );
        }

        for (const asyncHook of asyncHooks) {
            if (!compilation.hooks[asyncHook]) {
                continue;
            }

            this.compilation[asyncHook] = this.async(
                compilation.hooks[asyncHook],
                this.options(this.trace.compilation[asyncHook]),
                this.trace.compilation.all || this.trace.compilation[asyncHook]
            );
        }

        this.compilation.buildModule((module) => {
            header('compilation', 'buildModule');
            describeModule(module);
            footer();
        });

        this.compilation.rebuildModule((module) => {
            header('compilation', 'rebuildModule');
            describeModule(module);
            footer();
        });

        this.compilation.succeedModule((module) => {
            header('compilation', 'succeedModule');
            describeModule(module);
            footer();
        });

        this.compilation.failedModule((module, err) => {
            header('compilation', 'failedModule');
            describeModule(module);
            log(`  ${err}`);
            footer();
        });

        this.compilation.finishModules((modules) => {
            header('compilation', 'finishModules');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.dependencyReference((reference, dependency, module) => {
            header('compilation', 'dependencyReference');
            log(`  ${module.resource} > ${dependency.request}`);
            footer();
        });

        this.compilation.seal(() => {
            header('compilation', 'seal');
            footer();
        });

        this.compilation.unseal(() => {
            header('compilation', 'unseal');
            footer();
        });

        this.compilation.finishRebuildingModule((module) => {
            header('compilation', 'finishRebuildingModule');
            describeModule(module);
            footer();
        });

        this.compilation.beforeChunks(() => {
            header('compilation', 'beforeChunks');
            footer();
        });

        this.compilation.afterChunks((chunks) => {
            header('compilation', 'afterChunks');
            log(`  ${chunks.length} chunks`);
            footer();
        });

        this.compilation.optimizeDependenciesBasic((modules) => {
            header('compilation', 'optimizeDependenciesBasic');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.optimizeDependencies((modules) => {
            header('compilation', 'optimizeDependencies');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.optimizeDependenciesAdvanced((modules) => {
            header('compilation', 'optimizeDependenciesAdvanced');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.afterOptimizeDependencies((modules) => {
            header('compilation', 'afterOptimizeDependencies');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.optimize(() => {
            header('compilation', 'optimize');
            footer();
        });

        this.compilation.optimizeModulesBasic((modules) => {
            header('compilation', 'optimizeModulesBasic');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.optimizeModules((modules) => {
            header('compilation', 'optimizeModules');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.afterOptimizeModules((modules) => {
            header('compilation', 'afterOptimizeModules');
            log(`  ${modules.length} modules`);
            footer();
        });

        this.compilation.optimizeChunksBasic((chunks, chunkGroups) => {
            header('compilation', 'optimizeChunksBasic');
            footer();
        });

        this.compilation.optimizeChunks((chunks, chunkGroups) => {
            header('compilation', 'optimizeChunks');
            footer();
        });

        this.compilation.optimizeChunksAdvanced((chunks, chunkGroups) => {
            header('compilation', 'optimizeChunksAdvanced');
            footer();
        });

        this.compilation.afterOptimizeChunks((chunks, chunkGroups) => {
            header('compilation', 'afterOptimizeChunks');
            footer();
        });

        this.compilation.afterOptimizeTree((chunks, modules) => {
            header('compilation', 'afterOptimizeTree');
            footer();
        });

        this.compilation.optimizeChunkModulesBasic((chunks, modules) => {
            header('compilation', 'optimizeChunkModulesBasic');
            footer();
        });

        this.compilation.optimizeChunkModules((chunks, modules) => {
            header('compilation', 'optimizeChunkModules');
            footer();
        });

        this.compilation.optimizeChunkModulesAdvanced((chunks, modules) => {
            header('compilation', 'optimizeChunkModulesAdvanced');
            footer();
        });

        this.compilation.afterOptimizeChunkModules((chunks, modules) => {
            header('compilation', 'afterOptimizeChunkModules');
            footer();
        });

        this.compilation.shouldRecord(() => {
            header('compilation', 'shouldRecord');
            footer();
        });

        this.compilation.reviveModules((modules, records) => {
            header('compilation', 'reviveModules');
            footer();
        });

        this.compilation.optimizeModuleOrder((modules) => {
            header('compilation', 'optimizeModuleOrder');
            footer();
        });

        this.compilation.advancedOptimizeModuleOrder((modules) => {
            header('compilation', 'advancedOptimizeModuleOrder');
            footer();
        });

        this.compilation.beforeModuleIds((modules) => {
            header('compilation', 'beforeModuleIds');
            footer();
        });

        this.compilation.moduleIds((modules) => {
            header('compilation', 'moduleIds');
            footer();
        });

        this.compilation.optimizeModuleIds((modules) => {
            header('compilation', 'optimizeModuleIds');
            footer();
        });

        this.compilation.afterOptimizeModuleIds((modules) => {
            header('compilation', 'afterOptimizeModuleIds');
            footer();
        });

        this.compilation.reviveChunks((chunks, records) => {
            header('compilation', 'reviveChunks');
            footer();
        });

        this.compilation.optimizeChunkOrder((chunks) => {
            header('compilation', 'optimizeChunkOrder');
            footer();
        });

        this.compilation.beforeChunkIds((chunks) => {
            header('compilation', 'beforeChunkIds');
            footer();
        });

        this.compilation.optimizeChunkIds((chunks) => {
            header('compilation', 'optimizeChunkIds');
            footer();
        });

        this.compilation.afterOptimizeChunkIds((chunks) => {
            header('compilation', 'afterOptimizeChunkIds');
            footer();
        });

        this.compilation.recordModules((modules, records) => {
            header('compilation', 'recordModules');
            footer();
        });

        this.compilation.recordChunks((modules, records) => {
            header('compilation', 'recordChunks');
            footer();
        });

        this.compilation.beforeHash(() => {
            header('compilation', 'beforeHash');
            footer();
        });

        this.compilation.contentHash((chunk) => {
            header('compilation', 'contentHash');
            footer();
        });

        this.compilation.afterHash((chunk) => {
            header('compilation', 'afterHash');
            footer();
        });

        this.compilation.recordHash((record) => {
            header('compilation', 'recordHash');
            footer();
        });

        this.compilation.record((compilation, records) => {
            header('compilation', 'record');
            footer();
        });

        this.compilation.beforeModuleAssets(() => {
            header('compilation', 'beforeModuleAssets');
            footer();
        });

        this.compilation.shouldGenerateChunkAssets(() => {
            header('compilation', 'shouldGenerateChunkAssets');
            footer();
        });

        this.compilation.beforeChunkAssets(() => {
            header('compilation', 'beforeChunkAssets');
            footer();
        });

        this.compilation.additionalChunkAssets((chunks) => {
            header('compilation', 'additionalChunkAssets');
            footer();
        });

        this.compilation.additionalAssets(() => {
            header('compilation', 'additionalAssets');
            footer();
        });

        this.compilation.optimizeChunkAssets((chunks) => {
            header('compilation', 'optimizeChunkAssets');
            footer();
        });

        this.compilation.afterOptimizeChunkAssets((chunks) => {
            header('compilation', 'afterOptimizeChunkAssets');
            footer();
        });

        this.compilation.optimizeAssets((assets) => {
            header('compilation', 'optimizeAssets');
            footer();
        });

        this.compilation.afterOptimizeAssets((assets) => {
            header('compilation', 'afterOptimizeAssets');
            footer();
        });

        this.compilation.needAdditionalSeal(() => {
            header('compilation', 'needAdditionalSeal');
            footer();
        });

        this.compilation.afterSeal(() => {
            header('compilation', 'afterSeal');
            footer();
        });

        this.compilation.chunkHash((chunk, hash) => {
            header('compilation', 'chunkHash');
            footer();
        });

        this.compilation.moduleAsset((module, filename) => {
            header('compilation', 'moduleAsset');
            footer();
        });

        this.compilation.chunkAsset((chunk, filename) => {
            header('compilation', 'chunkAsset');
            footer();
        });

        this.compilation.assetPath((filename, data) => {
            header('compilation', 'assetPath');
            footer();
        });

        this.compilation.needAdditionalPass(() => {
            header('compilation', 'needAdditionalPass');
            footer();
        });

        this.compilation.childCompiler((compiler, name, index) => {
            header('compilation', 'childCompiler');
            log(`  ${name}`);
            footer();
        });
    }
}

class TracePlugin extends HookMaster {
    constructor({ verbose, trace } = DEFAULT_OPTIONS) {
        super(PLUGIN);

        this.verbose = verbose || false;
        this.trace = trace;

        this.compilationTrace = new TraceCompilation({
            verbose: this.verbose,
            trace: {
                compilation: trace.compilation,
            }
        }, this);
    }

    options(handlerOptions) {
        return {
            verbose: this.verbose,
            options: handlerOptions,
            plugin: this,
            tracer: this,
        };
    }

    apply(compiler) {

        const syncHooks = [
            'compile',
            'compilation',
            'shouldEmit',
            'normalModuleFactory',
            'contextModuleFactory',
            'failed',
        ];

        const asyncHooks = [
            'beforeCompile',
            'afterCompile',
            'done',
            'additionalPass',
            'beforeRun',
            'run',
            'emit',
            'afterEmit',
            'make',
        ];

        this.compiler = {};

        for (const syncHook of syncHooks) {
            this.compiler[syncHook] = this.sync(
                compiler.hooks[syncHook],
                this.options(this.trace.compiler[syncHook]),
                this.trace.compiler.all || this.trace.compiler[syncHook]
            );
        }

        for (const asyncHook of asyncHooks) {
            this.compiler[asyncHook] = this.async(
                compiler.hooks[asyncHook],
                this.options(this.trace.compiler[asyncHook]),
                this.trace.compiler.all || this.trace.compiler[asyncHook]
            );
        }

        this.compiler.beforeCompile(({ compilationDependencies }) => {
            header('compiler', 'beforeCompile');
            describeCompilationDependencies(compilationDependencies);
            footer();
        });

        this.compiler.compile(({ compilationDependencies }) => {
            header('compiler', 'compile');
            describeCompilationDependencies(compilationDependencies);
            footer();
        });

        this.compiler.afterCompile((compilation) => {
            header('compiler', 'afterCompile');

            if (compilation.assets) {
                const asset = chalk.italic.cyan;
                for (const p of Object.keys(compilation.assets)) {
                    log(`  ${asset(p)}`);
                }
            }

            footer();
        });

        this.compiler.done((stats) => {
            header('compiler', 'done');
            footer();
        });

        const compilerAll = this.trace.compiler.all;
        const thisCompilation = this.trace.compiler.thisCompilation;
        const thisCompilationOptions = this.options(thisCompilation);

        compiler.hooks.thisCompilation.tap(PLUGIN, (compilation) => {

            if (compilerAll || thisCompilation) {
                (function () {
                    header('compiler', 'thisCompilation');
                    footer();
                }).apply(thisCompilationOptions, arguments);
            }

            this.compilationTrace.apply(compilation);
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
