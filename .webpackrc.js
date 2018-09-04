export default {
  proxy: {
    '/api': {
      target: 'http://www.huipay.com:9931/huibeiwater/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  },
  extraBabelPlugins: [
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }]
  ],
}
