import chalk from 'chalk';
import * as _ from 'lodash';
import { getSummary } from './analisys';
import { log, table } from './logger';
import { IModuleDescription } from './models';

interface IReferenceDescription {
    order?: number;
    weak?: boolean;
    module?: IModuleDescription;
}

export function describeReference(reference: IReferenceDescription, options = {}) {
    const opts = _.assign({}, options);
    const ref = getSummary(
        reference,
        [
            'importedNames',
            'order',
            'weak',
            'module',
        ],
        {
            module(m: IModuleDescription) { return m.rawRequest; },
        },
    );

    log('');
    log(chalk.bgRed(`  `) + ' ' + chalk.red.bold('Reference'));

    table(ref, {
        showHeaders: false,
    });

    log(chalk.bgBlack(`  `));
}
