const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode": "development",
    "entry": path.join(__dirname, 'client/index.jsx'),
    "output": {
        "path": path.join(__dirname, 'dist'),
        "filename": "[name].[hash:8].js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [{
                "enforce": "pre",
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules|server/,
                "use": "eslint-loader"
            },
            {
                "test": /\.(js|jsx)$/,
                "include": [
                    path.resolve(__dirname, "client")
                ],
                "exclude": /node_modules|server/,
                "resolve": {
                    "extensions": [".jsx", ".js"],
                    "alias": {
                        "Api": path.resolve(__dirname, 'client/api/')
                    }
                },
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": (loader) => [
                                require('postcss-import')(),
                                require('postcss-cssnext')(),
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        appMountId: 'app'
    })],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        historyApiFallback: true
    }
}