var webpack=require('webpack');
var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var config={
    entry:{
        //第三方
        'vendors':['jquery', 'lodash', 'angular', 'angular-route']
        //其余的入口文件在下面
    },
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'lodash'
        })
    ]
};
//只有这样循环才可以在每个index文件中只引入对应的js文件
var pages=['index','login','register','challenge','idea','light','scope','resolve','question','email'];
pages.forEach(function(page){
    //和下面一行一个意思
    // config.entry[page] = ['./dev/', '/index.js'].join(page);
    //不用config.entry.page，因为page这样不是变量
    config.entry[page] = './dev/'+ page +'/index.js';
    var conf = {
        filename: page + '/index.html', //生成的html存放路径，相对于path
        template: './dev/'+ page +'/index.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ['vendors', page]
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});
module.exports = config;
//下面的代码和上面是一样的
// module.exports={
//     entry:{
//         'vendors':['jquery','angular','angular-route','lodash'],
//         'index':'./dev/index/index.js',
//         'login':'./dev/login/index.js',
//         'register':'./dev/register/index.js'
//     },
//     output: {
//         path:path.resolve(__dirname,'web'),
//         filename:'js/[name].bundle.js'
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery",
//             "window.jQuery": "jquery",
//             _: 'lodash'
//         }),
//         new HtmlWebpackPlugin({
//             filename:  'index/index.html', //生成的html存放路径，相对于path
//             template: './dev/index/index.html', //html模板路径
//             inject: 'body', //js插入的位置，true/'head'/'body'/false
//             hash: true, //为静态资源生成hash值
//             chunks: ['vendors', 'index']
//         }),
//         new HtmlWebpackPlugin({
//             filename:  'login/index.html', //生成的html存放路径，相对于path
//             template: './dev/login/index.html', //html模板路径
//             inject: 'body', //js插入的位置，true/'head'/'body'/false
//             hash: true, //为静态资源生成hash值
//             chunks: ['vendors', 'login']
//         }),
//         new HtmlWebpackPlugin({
//             filename:  'register/index.html', //生成的html存放路径，相对于path
//             template: './dev/register/index.html', //html模板路径
//             inject: 'body', //js插入的位置，true/'head'/'body'/false
//             hash: true, //为静态资源生成hash值
//             chunks: ['vendors', 'register']
//         })
//     ]
// }