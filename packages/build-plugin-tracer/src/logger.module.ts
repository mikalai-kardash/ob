import chalk from 'chalk';
import * as _ from 'lodash';
import { compilation } from 'webpack';
import { getSummary } from './analisys';
import { list, log, table } from './logger';
import { IHookSettings } from './models';

interface IModuleDescription {
    issuer?: IModuleDescription;
}

export function describeModule(module: compilation.Module, options: IHookSettings) {

    const opts = _.assign({
        issuer: false,
        title: 'Module',
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
        issuer(m: compilation.Module) { return m.rawRequest; },
    };

    const summary = getSummary(module, properties, accessors);

    log('');
    log(chalk.bgRed(`  `) + ' ' + chalk.red.bold(opts.title));

    const getSetValues = (set: Set<any>) => {
        if (set.size === 0) {
            return 'None';
        }
        const arr = Array.from(set);
        if (set.size === 1) {
            return arr[0];
        }
        return arr.join('\n');
    };

    const buildInfo = getSummary(
        module.buildInfo,
        [
            'contextDependencies',
            'fileDependencies',
            'cacheable',
            'assets',
        ],
        {
            assets: (o: any) => Object.keys(o).join('\n'),
            contextDependencies: (s) => getSetValues(s),
            fileDependencies: (s) => getSetValues(s),
        },
    );

    const dependencies = module.dependencies.map(function (dep) {
        return _.assign(
            {
                class: dep.constructor.name,
            },
            getSummary(
                dep,
                [
                    'optional',
                    'weak',
                    'name',
                    'exports',
                    'type',
                    'expression',
                    'module',
                ],
                {
                    module: m => m.rawRequest,
                    exports: e => e.join('\n'),
                },
            ));
    });

    // factoryMeta

    const loaders = module.loaders
        .map(l => l.loader)
        .map(n => /(\w*)-loader/i.exec(n))
        .filter(v => v !== null)
        .map(r => r[0]);
    ;

    table(summary, {
        showHeaders: false,
        title: 'Summary',
    });

    if (opts.buildInfo && module.buildInfo) {
        table(buildInfo, {
            showHeaders: false,
            title: 'Build Info',
        });
    }

    if (opts.loaders && module.loaders && module.loaders.length > 0) {
        list(loaders, {
            title: 'Loaders',
        });
    }

    if (opts.dependencies && module.dependencies && module.dependencies > 0) {
        table(dependencies, {
            title: 'Dependencies',
        });
    }

    if (opts.issuer && module.issuer) {
        const issuerSummary = getSummary(module.issuer, properties, accessors);

        table(issuerSummary, {
            showHeaders: false,
            title: 'Issuer',
        });
    }

    log(chalk.bgBlack(`  `));
}
