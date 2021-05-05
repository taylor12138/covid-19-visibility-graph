module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    //运行后默认打开浏览器
    open: true
  },

}