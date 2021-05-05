<template>
  <div class="rank-five">
    <div class="five-chart" ref="ranfive_ref"></div>
  </div>
</template>
<script>
import { getAboard } from "@/network/spiderData";
import adapter from "@/common/CommonAdapter.js";
import { mapState } from "vuex"; //公共主题切换
import { themeListener } from "@/common/mixin.js"; //公共主题切换
export default {
  name: "RankFive",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: [], // 返回数据
    };
  },
  mounted() {
    // 初始化图表
    this.initChart();
    // 获取数据
    this.getData();
    //自适应浏览器窗口大小，可惜resize会引起reflow，降低性能
    window.addEventListener("resize", this.screenAdapter);
    // 开头先调一次
    this.screenAdapter();
  },
  destroyed() {
    // 防止内存泄漏
    window.removeEventListener("resize", this.screenAdapter);
  },
  computed: {
    // 使用辅助函数mapState，将vuex的state属性化为己用
    ...mapState(["theme"]),
  },
  // 使用mixin导入公共的watcher,监听主题变化
  mixins: [themeListener],
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.ranfive_ref,
        this.theme
      );
      //对图表的配置进行初始化
      this.chartInstance.setOption(this.initOption());
    },
    getData() {
      getAboard().then((res) => {
        // 过滤数据
        this.RetData = res.data.getListByCountryTypeService2true.filter(
          (item) => {
            return (
              item.provinceName === "美国" ||
              item.provinceName === "中国" ||
              item.provinceName === "俄罗斯" ||
              item.provinceName === "法国" ||
              item.provinceName === "英国"
            );
          }
        );
        // console.log(this.RetData);
        // 这次先得到数据更新图表
        this.updateChart();
      });
    },
    initOption() {
      return {
        title: {
          text: "五大常任理事国现存确诊人数",
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + ": " + params[0].value + "人";
          },
        },
        grid: {
          // 设置坐标轴位置
          top: "33%",
          right: "6%",
          bottom: "10%",
        },
      };
    },
    updateChart(width = 50, height = 60) {
      // 城市名数组
      let Countries = this.RetData.map((item) => item.provinceName);
      // 确诊人数数组
      let values = this.RetData.map((item) => item.currentConfirmedCount);
      // 把不同国家对应图片加载数组
      let valueImgs = this.RetData.map((item) => {
        return {
          value: item.currentConfirmedCount,
          symbol:
            `image://` + require(`@/assets/font/${item.countryShortCode}.png`),
          // 图像的宽高
          symbolSize: [width, height],
        };
      });
      this.chartInstance.setOption({
        xAxis: {
          data: Countries,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: "#e54035",
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
        },
        color: ["#e54035"],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-130%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              opacity: 0.5,
            },
            data: values,
            z: 10,
          },
          {
            name: "glyph",
            type: "pictorialBar",
            barGap: "-100%",
            symbolPosition: "end",
            symbolSize: width,
            symbolOffset: [0, "-100%"],
            data: valueImgs,
          },
        ],
      });
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.ranfive_ref.offsetWidth / 100) * 3.6;
      // 和分辨率大小相关的配置
      this.chartInstance.setOption(adapter(titleFontSize));
      this.updateChart(titleFontSize * 1.75, titleFontSize * 2);
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped>
.rank-five,
.five-chart {
  width: 100%;
  height: 100%;
}
</style>