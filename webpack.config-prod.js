const path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    devtool:'cheap-source-map',
    target:'web',
    context: path.resolve(__dirname, './src'),
    entry:{
        app:'./app.js'
    },
    output:{
        path:path.resolve(__dirname, './dist'),
        publicPath:'/assests',
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                exclude:[/node_modules/],
                use:[{
                    loader: 'babel-loader'
                }]
            }
        ]},
    resolve:{
        extensions:[".js",".json"]
    },
    plugins:[

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename: "common.[id].js",
            minChunks:1
        }),
        new CompressionPlugin({
            asset: "bundle.js.gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        })
    ],
    // devServer:{
    //     contentBase: path.resolve(__dirname),
    //     historyApiFallback: true,
    //     port:8080
    // }
};
