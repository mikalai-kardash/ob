import chalk from 'chalk';
import * as _ from 'lodash';
import { getSummary } from './analisys';
import { log, table } from './logger';
import { IModuleDescription } from './models';

interface IDependencyDescription {
    module: IModuleDescription;
    request: string;
}

export function describeDependency(dependency: IDependencyDescription, options = {}) {
    const opts = _.assign({}, options);
    const dep = getSummary(
        dependency,
        [
            'request',
            'module',
        ],
        {
            module(m: IModuleDescription) { return m.rawRequest; },
        },
    );

    log(chalk.bgRed(`  `) + ' ' + chalk.red.bold('Dependency'));

    table(dep, {
        showHeaders: false,
    });

    log(chalk.bgBlack(`  `));
}
