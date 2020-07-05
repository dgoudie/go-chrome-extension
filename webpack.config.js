const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZipPlugin = require('zip-webpack-plugin')

module.exports = (env, argv) => {

    const isDevelopment = argv.mode === 'development';

    let plugins = [
        new MiniCssExtractPlugin(),
        new CopyPlugin([{ from: '**/!(*.ts|*.tsx|*.scss)', context: './src/' }]),
    ]
    
    !isDevelopment && (plugins = [...plugins, new ZipPlugin({filename: `${process.env.npm_package_name}-${process.env.npm_package_version}.zip`, path: '../'})])

    return {
        devtool: 'inline-source-map',
        entry: {
            'popup/index': './src/popup/index.tsx',
            'background': './src/background.ts'
        },
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
                    test: /\.module\.s(a|c)ss$/,
                    loader: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    loader: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.scss']
        },
        plugins,
        devServer: {
            writeToDisk: true,
            disableHostCheck: true
        }
    };
}
