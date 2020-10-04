/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
