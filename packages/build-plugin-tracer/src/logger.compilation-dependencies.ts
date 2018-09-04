import chalk from 'chalk';
import { log } from './logger';

export function describeCompilationDependencies(compilationDependencies: { size: number }) {
    const n = compilationDependencies.size;
    const dependencies = n === 0
        ? `${chalk.green.bold('' + n)} dependencies`
        : `${chalk.yellow('' + n)} dependencies`;

    log(`  ${dependencies}`);
}
