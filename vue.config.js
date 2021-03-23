/**
 * TODO: Solve the issue of not supporting mixin and functions
 * prependData: "import global.scss" was not a nice solution too much diplucations
 *  */
module.exports = {
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        prependData: `
          // Lets add some mixins and functions
        `
      }
    }
  }
}
