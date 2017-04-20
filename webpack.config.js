const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool:'eval',
    target:'web',
    watch:true,
    stats:"verbose",
    cache:false,
    context: path.resolve(__dirname, './src'),
    entry:{
        app:'./app.js'
    },
    output:{
        path:__dirname,
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
        extensions:[".js","*"]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"development"'
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase: path.resolve(__dirname),
        public:"shekhar",
        // compress:true,
        historyApiFallback: true,
        // hot:true,
        //lazy:true,
        port:8080
    }
};