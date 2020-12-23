var path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // when specifying paths for imports, allow usage of root dirs instead of relative paths
        src: path.resolve(__dirname, 'src'),
        srv: path.resolve(__dirname, 'srv')
      }
    },
  },
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
