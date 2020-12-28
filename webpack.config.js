const path = require('path'),
      nodeExternals = require('webpack-node-externals'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: { 
        extensions: ['.js',] 
    },

    entry: {
        'packages/main': './src/server',
        'client_packages': './src/client',
    },

    output: {
        path: path.resolve(__dirname),
        filename: '[name]/index.js'
    },

    target: 'node',
    externals: [nodeExternals()],

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/client', to: 'client_packages' }
            ],
        }),
    ]
};