<template>
  <div class="abroad">
    <div class="abroad-chart" ref="abroad_ref"></div>
  </div>
</template>
<script>
import { getAboard } from "@/network/spiderData";
import adapter from "@/common/CommonAdapter.js";
import { mapState } from "vuex"; //公共主题切换
import { themeListener } from "@/common/mixin.js"; //公共主题切换
export default {
  name: "Abroad",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: [], // 返回数据
      currentIndex: 0, //当前数据下标
      timer: null, //定时器
    };
  },
  mounted() {
    // 初始化图表
    this.initChart();
    // 获取数据
    this.getAboard();
    //自适应浏览器窗口大小，可惜resize会引起reflow，降低性能
    window.addEventListener("resize", this.screenAdapter);
    // 开头先调一次
    this.screenAdapter();
  },
  computed: {
    // 使用辅助函数mapState，将vuex的state属性化为己用
    ...mapState(["theme"]),
  },
  // 使用mixin导入公共的watcher,监听主题变化
  mixins: [themeListener],
  destroyed() {
    // 防止内存泄漏
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timer);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.abroad_ref,
        this.theme
      );
      //对图表的配置进行初始化
      this.chartInstance.setOption(this.initOption());
      //监听鼠标移入、移出事件
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterVal();
      });
    },
    getAboard() {
      getAboard().then((res) => {
        // console.log(res);
        // 截取前五个
        this.RetData = res.data.getListByCountryTypeService2true;
        // 请求数据完毕对图表进行更新,并且开启计时器、适配窗口大小事件
        this.updateChart();
        this.startInterVal();
        this.screenAdapter();
      });
    },
    initOption() {
      return {
        title: {
          text: "▍国外疫情情况",
          top: 20,
        },
        tooltip: {
          // 光标触发事件
          formatter: function (params) {
            return ` ${params.name}`;
          },
        },
      };
    },
    updateChart() {
      // 数据截取
      const start = this.currentIndex * 5;
      const end = start + 5;
      const nowData = this.RetData.slice(start, end);
      //各圆环图中心点的位置
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      // 各圆环图的位置
      const colorArr = [
        ["#c7e03a", "#d33333"],
        ["#4628c9", "#d33333"],
        ["#f52020", "#d33333"],
        ["#c6c928", "#d33333"],
        ["#2e72bf", "#d33333"],
      ];
      const seriesArr = nowData.map((item, index) => {
        return {
          type: "pie",
          center: centerArr[index],
          // labelLine: { show: true },
          label: {
            show: true,
            position: "center",
            color: "#b1b1b1",
          },
          data: [
            // 现存确诊人数
            {
              name: `${item.provinceName}现存确诊人数\n${item.currentConfirmedCount}人`,
              value: item.currentConfirmedCount,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    //百分之0下的颜色
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    //百分之100下的颜色
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              },
            },
            // 治愈人数
            {
              name: `${item.provinceName}治愈人数\n${item.curedCount}人`,
              value: item.curedCount,
              itemStyle: {
                color: "#3cd682",
              },
              label: {
                show: false,
              },
            },
          ],
        };
      });
      this.chartInstance.setOption({
        series: seriesArr,
      });
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.abroad_ref.offsetWidth / 100) * 3.6;
      const outer = titleFontSize * 2.6;
      const inner = titleFontSize * 2;
      this.chartInstance.setOption(adapter(titleFontSize));
      //有bug，数据更新后会重置圆环大小
      this.chartInstance.setOption({
        series: [
          {
            type: "pie",
            radius: [outer, inner],
            label: {
              fontSize: titleFontSize / 2,
            },
          },
          {
            type: "pie",
            radius: [outer, inner],
            label: {
              fontSize: titleFontSize / 2,
            },
          },
          {
            type: "pie",
            radius: [outer, inner],
            label: {
              fontSize: titleFontSize / 2,
            },
          },
          {
            type: "pie",
            radius: [outer, inner],
            label: {
              fontSize: titleFontSize / 2,
            },
          },
          {
            type: "pie",
            radius: [outer, inner],
            label: {
              fontSize: titleFontSize / 2,
            },
          },
        ],
      });
      this.chartInstance.resize();
    },
    startInterVal() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex >= 4) this.currentIndex = 0;
        this.updateChart();
      }, 2500);
    },
  },
};
</script>
<style scoped>
.abroad,
.abroad-chart {
  width: 100%;
  height: 100%;
  /* color:#b1b1b1 */
}
</style>