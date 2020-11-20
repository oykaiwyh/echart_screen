module.exports = {
  lintOnSave: false,
  devServer:{
    proxy:{
      '/api':{
        ws: false,
        target: 'http://101.133.174.173:5001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // css热更新需要变更为false
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: process.env.NODE_ENV === 'production',
    // css预设器配置项
    loaderOptions: {
      sass: {
        // V9版本
        // data: `@import "@/assets/scss/_variable.scss";`
        // V8版本
        // prependData: '@import "@/assets/scss/_variable.scss"; @import "@/assets/scss/_mixins.scss";'
        prependData: '@import "@/assets/style/index.scss";'
      }
    },

    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }
}
