"use strict";

const ModuleDependency = require('webpack');

class BookDependency extends ModuleDependency {
    constructor(request) {
        super(request);
        this.request = request;
        this.userRequest = request;
    }

    get type() {
        return "book dep";
    }
}

module.exports = BookDependency;
