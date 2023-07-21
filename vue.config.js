const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(cur|ani)$/, // Adicione a extensão do arquivo de cursor que você está usando (pode ser .cur ou .ani)
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },
  },
});
