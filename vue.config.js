const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    // webpack 配置
    plugins: [
      // 其他插件...
      new MonacoWebpackPlugin(),
    ],
  }
})
