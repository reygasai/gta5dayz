const path = require('path'), 
             nodeExternals = require('webpack-node-externals'), 
             CopyWebpackPlugin = require('copy-webpack-plugin'), 
             MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    resolve: { 
        extensions: ['.js',] 
    },

    entry: { 
        'packages/main': './src/server',
        'client_packages': ['./src/client', './src/client/ui/styles/main.scss'],
        'client_packages/ui/templates/authorization': './src/client/ui/templates/authorization'
    },

    output: {
        path: path.resolve(__dirname),
        filename: '[name]/index.js'
    },

    target: 'node',
    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader?url=false",
                  "postcss-loader",
                  "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src', 'client'), to: path.resolve(__dirname, 'client_packages'),
                    globOptions: {
                        ignore: ["**/styles/**", "**/modules/**"],
                    },
                },  
            ],
        }),

        new MiniCssExtractPlugin({
            filename: "./src/client/ui/styles.css",
        })
    ]
};