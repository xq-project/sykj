const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    publicPath: './',
    outputDir: 'fbp-account-fe', //输出路径
    assetsDir: 'assets', //放置静态文件夹目录
    // css相关配置
    css: {
        // 是否分离css（插件ExtractTextPlugin）
        extract: true,
        // 是否开启 CSS source maps
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 是否启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // 生产环境是否生成 sourceMap 文件 设置为false，防止看到源代码
    productionSourceMap: false,
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack: config => { //路径配置
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，
            .set('_c', resolve('src/components'))
    },
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: {
            '/szlbackgroundprogram': {
                ws: false, //webstock
                target: 'http://127.0.0.1:8088', //代理对象  springboot项目访问接口
                changeOrigin: true,
                pathRewrite: {
                    '^/szlbackgroundprogram': ''
                },
            },
            // '/nginx': {
            //     //target: 'http://127.0.0.1:8090', //API服务器的地址
            //     target: 'http://192.168.11.31:8090', //API服务器的地址
            //     ws: true, //代理websockets
            //     changeOrigin: true, // 虚拟的站点需要更管origin
            //     pathRewrite: {
            //         '^/nginx': ''
            //     },
            // }
        },
        //assetsPublicPath: './' //nginx发布带项目名访问
    },
}