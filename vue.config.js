const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://test.my-site.com'
      }
    }
  },
  configureWebpack: require('./webpack.config')
})
