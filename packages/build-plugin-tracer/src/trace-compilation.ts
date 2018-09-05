import chalk from 'chalk';
import { compilation } from 'webpack';
import { HookMaster } from './hook-master';
import { footer, header } from './logger';
import { ITraceCompilationOptions, ITraceOptions } from './models';

const PLUGIN = 'TracePlugin';

const COMPILATION_THEME = {
    event: chalk.bgBlack,
    eventSource: chalk.bgYellow.black.bold,
    eventTarget: chalk.cyanBright.bold,
};

export class TraceCompilation extends HookMaster {
    private compilation: any;
    private verbose?: boolean;
    private trace?: ITraceOptions;

    constructor({ verbose, trace }: ITraceCompilationOptions, private plugin: any) {
        super(PLUGIN);
        this.verbose = verbose;
        this.trace = trace;
        this.plugin = plugin;
        this.compilation = {};
    }

    public options(handlerOptions: any): any {
        const t = this;
        return {
            options: handlerOptions,
            plugin: this.plugin,
            tracer: t,
            verbose: this.verbose,
        };
    }

    public apply(comp: compilation.Compilation): void {
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

        const hooks = [
            comp.hooks.optimizeTree,
            comp.hooks.additionalAssets,
        ];

        for (const h of hooks) {
            this.compilation['test'] = this.async(
                h,
                this.options(this.trace.compilation['test']),
                this.trace.compilation.all || this.trace.compilation[syncHook]
            );
        }

        for (const syncHook of syncHooks) {
            if (!comp.hooks[syncHook]) {
                continue;
            }

            this.compilation[syncHook] = this.sync(
                comp.hooks[syncHook],
                this.options(this.trace.compilation[syncHook]),
                this.trace.compilation.all || this.trace.compilation[syncHook]
            );
        }

    }
}
