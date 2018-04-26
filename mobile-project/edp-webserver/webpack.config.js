const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const mockServer = require('./_build/mockServer.js');
const fs = require('fs');

const baseUrl = __dirname;
const orgDir = 'src/spa';
const outputDir = 'src/build_spa';
const srcDir = path.resolve(__dirname, orgDir);
const fileObjs = {};

// 获取多页面的每个入口文件，用于配置中的entry
const getEntryFiles = (src) => {
    var dirs = fs.readdirSync(src);
    var matchs = [];
    dirs.forEach((item) => {
        matchs = item.match(/(.+)\.js[x]?$/);
        var fsPath = path.resolve(src, item);
        if (matchs) {
            var key = fsPath.substr(baseUrl.length + orgDir.length + 1).replace(/\.js[x]?$/, '');
            // console.log(baseUrl);
            // console.log(fsPath.substr(baseUrl.length + 1));
            console.log(key);
            fileObjs[key] = fsPath;
        }
        else if (fs.statSync(fsPath).isDirectory()) {
            getEntryFiles(fsPath);
        }
    });

    return fileObjs;
};

module.exports = {
    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     progress: true,
    //     contentBase: './src/spa/output',
    //     port: 8080
    // },
    // devServer: {
    //     '/**/*.do': {
    //         secure: false,
    //         bypass: function(req, res, proxyOptions) {
    //             mockServer(req, res);
    //         }
    //     }
    // },
  // devtool: '#inline-source-map',
    // 输入文件，''|[]|{}
    // 当entry是个数组的时候，里面同样包含入口js文件，另外一个参数可以是用来配置webpack提供的一个静态资源服务器，
    // webpack-dev-server。webpack-dev-server会监控项目中每一个文件的变化，实时的进行构建，并且自动刷新页面
    //   'webpack/hot/dev-server',
    //   'webpack-dev-server/client?http://localhost:8080',
    // entry: getEntryFiles(srcDir),
    // entry: {
    //     'polyfill': 'babel-polyfill'
    // },
    entry: './src/app.js',
    // entry: path.resolve(__dirname, 'test.js'),
    output: {
        // 输出目录
        path: path.resolve(__dirname, outputDir),
        // 输出文件名，取entry的key
        filename: '[name].js',
        chunkFilename:'[id].chunk.js',
        // 输出类型
        libraryTarget: "umd"
        /*
        * chunkFilename用来打包require.ensure或者require([''])方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
        * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
        * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
        * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
        * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
        * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
        * */
        // chunkFilename:'js/[chunkhash:8].chunk.js'
    },
    // 当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中
    // externals: {
    //     "jquery": "jQuery"
    // },
    // TODO：当你的库会依赖那些不会包含进编译后的版本中时，你可以使用externals选项
    // https://github.com/webpack/webpack/tree/master/examples/externals
    // externals: [
	// 	"add",
	// 	{
	// 		"subtract": {
	// 			root: "subtract",
	// 			commonjs2: "./subtract",
	// 			commonjs: ["./math", "subtract"],
	// 			amd: "subtract"
	// 		}
	// 	}
	// ],
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
                // loaders: ['style-loader', 'css-loader', 'postcss-loader']
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader'
                // })
              },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
                // loaders: ['style-loader', 'css-loader', 'postcss-loader']
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader'
                // })
              }
        ]
    },
    resolve: {
        // //查找module的话从这里开始查找
        // root: 'E:/github/flux-example/src', //绝对路径
        // //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // extensions: ['', '.js', '.json', '.scss'],
        // //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // alias: {
        //     AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        //     ActionType : 'js/actions/ActionType.js',
        //     AppAction : 'js/actions/AppAction.js'
        // }
        // alias: {
        //     zepto: 'lib/zepto/zepto.debug.js'
        // },
        modules: [ path.resolve(__dirname, 'node_modules')],
        // modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['*', '.web.js', '.jsx', '.js', '.json', '.styl']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
        // 保留require的写法又想把css文件单独拿出来
        // 将css放到index.html的body上面
        new ExtractTextPlugin({
            filename: 'main.css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/spa/index.html'),
                to: path.resolve(__dirname, 'src/spaOutput/index.html')
            }
        ])
        // // 抽取公共部分
        // new CommonsChunkPlugin({
        //     // 公共部分名称
		// 	name: "commons",
        //     // 要抽取的entry对应的key，可以省略
		// 	chunks: ["pageA", "pageB", "admin-commons"],
        //     // 公共模块被使用的最小次数
        //     // 可以是数字
        //     // 也可以是fn，参数module和count
		// 	minChunks: 2,
        //     // 作用类似于minChunks，只不过这里控制的文件大小
        //     minSize: 1024,
        //     // 这个参数比较有意思，他可以将common chunks不单独存放，而是将其加入到所引用的页面JS中进行合并
        //     children: true
		// }),
        // new CommonsChunkPlugin({
        //     // 公共部分名称
		// 	name: "commons",
        //     // 公共模块被使用的最小次数
        //     // 可以是数字
        //     // 也可以是fn，参数module和count
		// 	minChunks: 2
		// }),
        // 在output中自动生成html插件
        // new HtmlWebpackPlugin({
        //     // 设置title的名字
        //     title: 'My App',
        //     // 设置这个html的文件名
        //     filename: 'admin.html',
        //     // 要使用的模块的路径
        //     template: 'header.html',
        //     // 把模板注入到哪个标签后,
        //     inject: 'body',
        //     // 给html添加一个favicon
        //     favicon: './images/favico.ico',
        //     // 是否压缩  {...} | false
        //     minify: true,
        //     // 是否hash化 true|false
        //     hash:true,
        //     // 是否缓存
        //     cache:false,
        //     // 是否显示错误
        //     showErrors:false,
        //     "chunks": {
        //         "head": {
        //             "entry": "assets/head_bundle.js",
        //             "css": [ "main.css" ]
        //         }
        //     },
        //     // 是否自动关闭标签 默认false
        //     xhtml:false
        // })
        // new uglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),
        // new webpack.DllPlugin({
        //     name: "[name]",
        //     path: path.resolve(__dirname, "build/manifest.json")
        // })
    ]
};