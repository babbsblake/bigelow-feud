var path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // when specifying paths for imports, allow usage of "src" root dir
        src: path.resolve(__dirname, 'src')
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
