const path = require('path');
const package = require('./package.json');

module.exports = {
    entry: path.join(__dirname, '/src/index.ts'),
    
    target: 'node',

    output: {
        filename: package.name + '.js',
        path: path.join(__dirname, 'lib'),
        libraryTarget: 'commonjs2',
    },

    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
