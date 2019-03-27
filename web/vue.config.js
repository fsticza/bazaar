// vue.config.js
module.exports = {
  devServer: {
    port: 3053,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(([options = {}]) => {
      return [{
        ...options, // these are the env variables from your .env file, if any arr defined
        'process.env': {
          ...options['process.env'],
          VERSION: JSON.stringify(require('./package.json').version)
        }
      }]
    })
  }
}
