"use strict";

const events = [
    'entryOption',
    'plugins',
    'resolvers',
    'environment',
    'run',
    'ModuleFactory',
    'compile',
    'compilation',
    'make',
    'emit',
    'done',
    'failed',
    'invalid',
    'watchClose',
];

const EVENT_NAMES = {
    'compile': {
        before: 'beforeCompile',
        after: 'afterCompile'
    },
    'entryOption': 'entryOption'
};

class Hook {
    constructor(eventName) {
        if (EVENT_NAMES[eventName]) {
            this.eventName = eventName;
        }
    }

    after() {
        this.eventName = EVENT_NAMES[this.eventName].after || '';
    }

    before() {
        this.eventName = EVENT_NAMES[this.eventName].before || '';
    }

    when(hooksContainer) {
        
    }
}