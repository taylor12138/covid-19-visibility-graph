//导入公共js方法
export const themeListener = {
  watch: {
    // 监听vuex主题的变化
    theme() {
      // 销毁当前图表
      this.chartInstance.dispose();
      this.initChart(); // 重新初始化图表
      this.screenAdapter(); //重新适配屏幕
      this.updateChart(); //更新图表
    },
  },
}