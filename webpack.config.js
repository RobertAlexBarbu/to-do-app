const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
    },
    devServer: {
        static: 'dist',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
            }
        ],
    }
}