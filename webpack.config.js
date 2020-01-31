const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const tsFiles = glob.sync('./src/**/*.ts{,x}');
let entry = {};
tsFiles.forEach(file => {
    const fileName = file.replace(/\.tsx?$/i, '');
    entry[fileName] = file;
});

module.exports = {
    devtool: 'inline-source-map',
    entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [new CopyPlugin([{ from: 'src/**/!(*.ts|*.tsx|*.scss)' }])],
    devServer: {
        writeToDisk: true,
        disableHostCheck: true
    }
};
