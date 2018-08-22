"use strict";

const PLUGIN = "BookPlugin";

class BookPlugin {
    constructor() { }

    apply(compiler) {
        console.log(PLUGIN);
    }
}

module.exports = BookPlugin;
