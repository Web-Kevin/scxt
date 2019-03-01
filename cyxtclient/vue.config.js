module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    devServer: {
        proxy: 'http://192.168.1.111:3000'
    } // 配置跨域处理,只有一个代理

    //   // 配置多个代理
    //   // proxy: {
    //   //   '/api': {
    //   //     target: 'http://127.0.0.1:3030',
    //   //     ws: true,
    //   //     changeOrigin: true
    //   //   }

    //   // }
}