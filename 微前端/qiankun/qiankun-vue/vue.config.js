
module.exports = {
    devServer: {
        port: 1000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            library: 'vueApp',
            libraryTarget: 'umd'
        }
    }
}