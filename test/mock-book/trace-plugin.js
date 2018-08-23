"use strict";

const chalk = require('chalk');
const figures = require('figures');
const _ = require('lodash');
const columnify = require('columnify');
const symbols = require('log-symbols');
const indentString = require('indent-string');

const PLUGIN = 'TracePlugin';
const log = console.log;

const DEFAULT_OPTIONS = {
    verbose: true,
    trace: {
        compiler: {
            // all: true,
            // beforeCompile: true,
            // compile: true,
            // afterCompile: {
            //     modules: true,
            //     assets: true
            // },
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
            // all: true,
            // buildModule: {
            //     issuer: true
            // },
            // rebuildModule: {},
            // failedModule: {},
            // succeedModule: {},
        },
    }
};

const DEFAULT_THEME = {
    event: chalk.bgBlack,
    eventTarget: chalk.cyanBright.bold,
    eventSource: chalk.bgWhite.black.bold,
};

const COMPILATION_THEME = {
    event: chalk.bgBlack,
    eventTarget: chalk.cyanBright.bold,
    eventSource: chalk.bgYellow.black.bold,
};

function header(target, event, theme = DEFAULT_THEME) {
    const s = target.toUpperCase();
    const t = event;
    const message = `${theme.eventSource(s)} ${theme.eventTarget(t)}`;
    log(theme.event(message));
}

function list(arr, options = { title: '' }, theme = {
    title: chalk.underline,
    regular: chalk.blue.dim,
    item: chalk.italic,
    indentation: 2
}) {
    const render = _.template(
        `
            <% _.each(list, function(item) { 
                %><%= bullet %> <%= theme.item(item) %>\n<% 
            }); %>
        `.trim()
    );

    if (options.title) {
        log(theme.title(options.title));
    }

    log(
        indentString(
            theme.regular(
                render({
                    list: arr,
                    bullet: figures.bullet,
                    theme,
                    options,
                }),
            ),
            theme.indentation
        )
    );

    log('');
}

function table(
    arr,
    options = {},
    theme = {
        header: chalk.dim.gray,
        type: chalk.yellow,
        dependenciesHighlight: chalk.bold,
        regular: chalk.white,
        title: chalk.white.underline,
        key: chalk.white.dim,
        value: chalk.greenBright,
    }) {

    const opts = _.assign({
        showHeaders: true,
        title: '',
        indentation: 2
    }, options);

    const columns = columnify(arr, {
        preserveNewLines: true,
        showHeaders: opts.showHeaders,
        headingTransform: function (h) {
            return theme.header(h.toLowerCase());
        },
        config: {
            key: {
                dataTransform: function (d) {
                    return theme.key(d);
                },
            },
            value: {
                dataTransform: function (d) {
                    return theme.value(d);
                },
            },
            errors: {
                headingTransform: function () {
                    return symbols.error;
                },
                minWidth: 3,
            },
            warnings: {
                headingTransform: function () {
                    return symbols.warning;
                },
                minWidth: 3,
            },
            type: {
                dataTransform: function (v) {
                    return theme.type(v);
                },
            },
            dependencies: {
                dataTransform: function (v) {
                    if (v > 0) {
                        return theme.dependenciesHighlight(v);
                    }
                    return theme.regular(v);
                },
                headingTransform: function (h) {
                    return theme.header('deps');
                },
            }
        }
    });

    if (opts.title) {
        log(theme.title(opts.title));
    }
    log(indentString(columns, opts.indentation));
    log('');
}

function footer() {
    log('');
}

function setProperty(source, target, prop, accessors = {}) {
    const val = source[prop];

    if (typeof val === "undefined") return;
    if (typeof val === "function") return;

    if (typeof val === "string" ||
        typeof val === "number" ||
        typeof val === "boolean"
    ) {
        target[prop] = val;
        return;
    }

    if (typeof val === "object") {
        if (val === null) return;

        if (accessors[prop] && val) {
            target[prop] = accessors[prop](val);
        }

        // array
        if (val && val.length) {
            if (val.length > 0) {
                target[prop] = val.length;
            }
            return;
        }

        // map or set
        if (val && val.size) {
            if (val.size > 0) {
                target[prop] = val.size;
            }
            return;
        }

        // object-map
        const keys = Object.keys(val);
        if (keys.length === 0) return;
        target[prop] = keys.length;
        return;
    }
};

function getSummary(source, properties, accessors = {}) {
    const target = {};

    _.each(properties, function (property) {
        setProperty(source, target, property, accessors);
    });

    const withSortedKeys = _.fromPairs(
        _.sortBy(
            _.toPairs(target),
        )
    );

    return withSortedKeys;
}

function describeCompilation(compilation, options) {
    const opts = _.assign({}, options);

    const summary = getSummary(compilation, [
        'additionalChunkAssets',
        'children',
        'chunkGroups',
        'chunks',
        'compilationDependencies',
        'dependencyFactories',
        'dependencyTemplates',
        'entries',
        'entrypoints',
        'errors',
        'fileDependencies',
        'fullHash',
        'hash',
        'namedChunks',
        'namedChunkGroups',
        'warnings',
        'modules',
        'assets',
        'missingDependencies',
    ]);

    log('');
    log(chalk.bgRed(`  `) + ' ' + chalk.red.bold('Compilation'));

    table(summary, { title: 'Summary', showHeaders: false });

    if (opts.modules) {
        if (compilation.modules && compilation.modules.length > 0) {
            const modules = compilation.modules.map(m => {
                const module = {
                    type: m.type,
                    dependencies: m.dependencies.length,
                    id: m.id,
                };

                if (m.warnings && m.warnings.length > 0) {
                    module.warnings = m.warnings.join('\n');
                }

                if (m.errors && m.errors.length > 0) {
                    module.errors = m.errors.join('\n');
                }

                return module;
            });

            table(modules, {
                title: 'Modules',
            });
        }
    }

    if (opts.assets) {
        if (compilation.assets) {
            list(Object.keys(compilation.assets), {
                title: 'Assets'
            });
        }
    }

    log(chalk.bgBlack(`  `));
}

function describeCompilationDependencies(compilationDependencies) {
    const n = compilationDependencies.size;
    const dependencies = n === 0
        ? `${chalk.green.bold(n)} dependencies`
        : `${chalk.yellow(n)} dependencies`;

    log(`  ${dependencies}`);
}

function describeModule(module, options) {

    const opts = _.assign({
        issuer: false,
    }, options);

    const properties = [
        'context',
        'errors',
        'dependencies',
        'buildTimestamp',
        'built',
        'context',
        'depth',
        'error',
        'errors',
        'factoryMeta',
        'rawRequest',
        'type',
        'warnings',
        'variables',
        'reasons',
        'binary',
        'optimizationBailout',
        'resource',
        'issuer',
        'loaders',
        'useSourceMap',
    ];

    const accessors = {
        issuer: function (m) { return m.rawRequest; },
    };

    const summary = getSummary(module, properties, accessors);

    log('');
    log(chalk.bgRed(`  `) + ' ' + chalk.red.bold('Module'));

    table(summary, {
        showHeaders: false,
        title: 'Summary'
    });

    if (opts.issuer && module.issuer) {
        const issuerSummary = getSummary(module.issuer, properties, accessors);

        table(issuerSummary, {
            showHeaders: false,
            title: 'Issuer'
        });
    }

    log(chalk.bgBlack(`  `));
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

        this.compilation.buildModule(function (module) {
            header('compilation', 'buildModule (module)', COMPILATION_THEME);
            describeModule(module, this.options);
            footer();
        });

        this.compilation.rebuildModule(function (module) {
            header('compilation', 'rebuildModule (module)', COMPILATION_THEME);
            describeModule(module, this.options);
            footer();
        });

        this.compilation.succeedModule(function (module) {
            header('compilation', 'succeedModule (module)', COMPILATION_THEME);
            describeModule(module, this.options);
            footer();
        });

        this.compilation.failedModule(function (module, err) {
            header('compilation', 'failedModule (module, error)', COMPILATION_THEME);
            describeModule(module, this.options);
            footer();
        });

        this.compilation.finishModules(function (modules) {
            header('compilation', 'finishModules');
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

        this.compiler.afterCompile(function (compilation) {
            header('compiler', 'afterCompile (compilation)');
            describeCompilation(compilation, this.options);
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

        this.compiler.compilation((compilation, params) => {
            header('compiler', 'compilation');
            footer();
        });

        this.compiler.shouldEmit((compilation) => {
            header('compiler', 'shouldEmit');
            footer();
        });

        this.compiler.additionalPass(() => {
            header('compiler', 'additionalPass');
            footer();
        });

        this.compiler.beforeRun((compiler) => {
            header('compiler', 'beforeRun');
            footer();
        });

        this.compiler.run((compiler) => {
            header('compiler', 'run');
            footer();
        });

        this.compiler.emit((compilation) => {
            header('compiler', 'emit');
            footer();
        });

        this.compiler.afterEmit((compilation) => {
            header('compiler', 'afterEmit');
            footer();
        });

        this.compiler.normalModuleFactory((factory) => {
            header('compiler', 'normalModuleFactory');
            footer();
        });

        this.compiler.contextModuleFactory((factory) => {
            header('compiler', 'contextModuleFactory');
            footer();
        });

        this.compiler.make((compilation) => {
            header('compiler', 'make');
            footer();
        });

        this.compiler.failed((err) => {
            header('compiler', 'failed');
            log(`  ${err}`);
            footer();
        });
    }
}

// todo: can we compare compilation between events and show diff?

module.exports = TracePlugin;
