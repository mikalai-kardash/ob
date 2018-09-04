import * as _ from 'lodash';

function setProperty(
    source: { [key: string]: any },
    target: { [key: string]: any },
    prop: string,
    accessors: { [key: string]: (v: any) => any } = {},
) {
    const val = source[prop];

    if (typeof val === 'undefined') { return; }
    if (typeof val === 'function') { return; }

    if (typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean'
    ) {
        if (isNaN(val as number)) { return; }

        target[prop] = val;
        return;
    }

    if (typeof val === 'object') {
        if (val === null) { return; }

        if (accessors[prop] && val) {
            target[prop] = accessors[prop](val);
            return;
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
        if (keys.length === 0) { return; }
        target[prop] = keys.length;
        return;
    }
}

export function getSummary(
    source: { [key: string]: any },
    properties: { [key: string]: any },
    accessors = {},
): { [key: string]: any } {
    const target = {};

    _.each(properties, (property) => {
        setProperty(source, target, property, accessors);
    });

    const withSortedKeys = _.fromPairs(
        _.sortBy(
            _.toPairs(target),
        ),
    );

    return withSortedKeys;
}
