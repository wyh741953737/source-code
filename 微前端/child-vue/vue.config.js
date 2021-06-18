module.exports = {
    configureWebpack: {
        output: {
            library: 'singleVue', //打包成的类库
            libraryTarget: 'umd', // 打包成umd模块，umd会把导出的bootstrap，mount， unmount导出到window.SingleVue上面
        },
        devServer: {
            port: 1000,
        }
    }
}