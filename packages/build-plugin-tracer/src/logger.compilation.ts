import chalk from 'chalk';
import * as _ from 'lodash';
import { compilation as CompilationNs } from 'webpack';
import { getSummary } from './analisys';
import { list, log, table } from './logger';
import { IHookSettings } from './models';

export function describeCompilation(compilation: CompilationNs.Compilation, options: IHookSettings) {
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
            const modules = compilation.modules.map((m) => {
                const module: {
                    dependencies?: number,
                    id?: number,
                    type?: string,
                    warnings?: number,
                    errors?: number,
                } = {
                    dependencies: m.dependencies.length,
                    id: m.id,
                    type: m.type,
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
                title: 'Assets',
            });
        }
    }

    log(chalk.bgBlack(`  `));
}
