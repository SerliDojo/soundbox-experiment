const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode": "development",
    "entry": path.join(__dirname, 'client/index.js'),
    "output": {
        "path": path.join(__dirname, 'dist'),
        "filename": "[name].[chunkhash:8].js"
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
                "exclude": /node_modules|server/,
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
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        lazy: true,
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        historyApiFallback: true
    }
}