import chalk from 'chalk';
import columnify from 'columnify';
import * as figures from 'figures';
import * as indentString from 'indent-string';
import * as _ from 'lodash';
import * as symbols from 'log-symbols';

const DEFAULT_THEME = {
    event: chalk.bgBlack,
    eventSource: chalk.bgWhite.black.bold,
    eventTarget: chalk.cyanBright.bold,
};

// tslint:disable-next-line:no-console
export const log = console.log;

export function header(target: string, event: string, theme = DEFAULT_THEME) {
    const s = target.toUpperCase();
    const t = event;
    const message = `${theme.eventSource(s)} ${theme.eventTarget(t)}`;
    log(theme.event(message));
}

export function list(arr: string[], options = { title: '' }, theme = {
    indentation: 2,
    item: chalk.italic,
    regular: chalk.blue.dim,
    title: chalk.underline,
}) {
    const render = _.template(
        `
            <% _.each(list, function(item) {
                %><%= bullet %> <%= theme.item(item) %>\n<%
            }); %>
        `.trim(),
    );

    if (options.title) {
        log(theme.title(options.title));
    }

    log(
        indentString(
            theme.regular(
                render({
                    bullet: figures.bullet,
                    list: arr,
                    options,
                    theme,
                }),
            ),
            theme.indentation,
        ),
    );

    log('');
}

export function table(
    arr: any[] | {},
    options = {},
    theme = {
        dependenciesHighlight: chalk.bold,
        header: chalk.dim.gray,
        key: chalk.white.dim,
        regular: chalk.white,
        title: chalk.white.underline,
        type: chalk.yellow,
        value: chalk.greenBright,
    }) {

    const opts = _.assign({
        indentation: 2,
        showHeaders: true,
        title: '',
    }, options);

    try {
        const columns = columnify(arr, {
            config: {
                dependencies: {
                    dataTransform(v) {
                        if (+v > 0) {
                            return theme.dependenciesHighlight(v);
                        }
                        return theme.regular(v);
                    },
                    headingTransform() {
                        return theme.header('deps');
                    },
                },
                errors: {
                    headingTransform() {
                        return symbols.error;
                    },
                    minWidth: 3,
                },
                key: {
                    dataTransform(d) {
                        return theme.key(d);
                    },
                },
                type: {
                    dataTransform(v) {
                        return theme.type(v);
                    },
                },
                value: {
                    dataTransform(d) {
                        return theme.value(d);
                    },
                },
                warnings: {
                    headingTransform() {
                        return symbols.warning;
                    },
                    minWidth: 3,
                },
            },
            headingTransform(h) {
                return theme.header(h.toLowerCase());
            },
            preserveNewLines: true,
            showHeaders: opts.showHeaders,
        });

        if (opts.title) {
            log(theme.title(opts.title));
        }
        log(indentString(columns, opts.indentation));
    } catch (e) {
        throw new Error(`Unable to convert to table ${arr}: ${e}.`);
    }

    log('');
}

export function footer() {
    log('');
}
