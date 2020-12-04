const path = require('path');
const webpack = require('webpack');
module.exports = {
    publicPath: './',    // 公共路径
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
    lintOnSave: false,  // 关闭eslint
    productionSourceMap: true,  // 生产环境下css 分离文件
    runtimeCompiler: true,
    devServer: {   // 配置服务器
        port: 0916,
        host: 'hawkeye.com',
        https: false, // https:{type:Boolean}
        // open: true, 
        disableHostCheck: true,
        proxy: {
            '/apis': {
                target: 'http://47.107.47.58/php2/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    },
    configureWebpack: {  // 覆盖webpack默认配置的都在这里
        resolve: {   // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/assets/css'),
                '@s': path.resolve(__dirname, './src/components'),
                '@i': path.resolve(__dirname, './src/assets/img'),
            }
        }
    }
}
