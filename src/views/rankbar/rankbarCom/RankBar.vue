<template>
  <div class="rank-bar">
    <div class="rank-chart" ref="rankbar_ref"></div>
  </div>
</template>
<script>
import { getData } from "@/network/spiderData";
import adapter from "@/common/CommonAdapter.js";
import { mapState } from "vuex"; //公共主题切换
import { themeListener } from "@/common/mixin.js"; //公共主题切换
export default {
  name: "RankBar",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: [], // 返回数据
      startValue: 0, //区域缩放起点值
      endValue: 6, //区域缩放终点值
      timer: null, //定时器
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
        this.$refs.rankbar_ref,
        this.theme
      );
      //对图表的配置进行初始化
      this.chartInstance.setOption(this.initOption());
    },
    getData() {
      getData().then((res) => {
        res.data.getAreaStat.forEach((item) => {
          this.RetData.push({
            name: item.provinceShortName, // 省份名字
            value: item.confirmedCount, //累计确诊人数
          });
        });
        // console.log(this.RetData);
        // 按确诊人数从大到小排序
        this.RetData.sort((a, b) => {
          return b.value - a.value;
        });
        this.updateChart(); //更新图表
        this.ZoomInterval(); //开启定时器事件
        this.chartInstance.on("mouseover", () => {
          clearInterval(this.timer);
        });
        this.chartInstance.on("mouseout", () => {
          this.ZoomInterval();
        });
      });
    },
    updateChart() {
      const ColorArr = [
        ["#e46bb6", "#E63F00"],
        ["#3a15df", "#E63F00"],
        ["#26df15", "#E63F00"],
      ];
      const provinceArr = this.RetData.map((item) => item.name);
      const valueArr = this.RetData.map((item) => item.value);
      this.chartInstance.setOption({
        xAxis: {
          data: provinceArr,
          textStyle: {
            fontSize: 35,
          },
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColor = null;
                if (arg.value > 20000) {
                  targetColor = ColorArr[0];
                } else if (arg.value > 1000) {
                  targetColor = ColorArr[1];
                } else {
                  targetColor = ColorArr[2];
                }
                // 渐变颜色，需要new一个实例，同时携带颜色渐变方向、不同百分比下颜色的值的参数
                // color:new this.$echarts.graphic,LinearGradient(x1, y1, x2, y2, [])
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    //百分之0下的颜色
                    offset: 0,
                    color: targetColor[1],
                  },
                  {
                    //百分之100下的颜色
                    offset: 1,
                    color: targetColor[0],
                  },
                ]);
              },
            },
          },
        ],
      });
    },
    initOption() {
      return {
        title: {
          text: "▍各省疫情确诊累计人数",
          top: 20,
        },
        tooltip: {
          formatter: function (params) {
            return `地区：${params.name}</br> 累计确诊：${params.value}`;
          },
        },
        grid: {
          // 设置坐标轴位置
          top: "20%",
          left: "8%",
          right: "6%",
          bottom: "6%",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.rankbar_ref.offsetWidth / 100) * 3.6;
      const half = titleFontSize / 2;
      // 和分辨率大小相关的配置
      this.chartInstance.setOption(adapter(titleFontSize));
      this.chartInstance.setOption({
        // 顺便调整一下x、y轴的字体大小
        xAxis: {
          axisLabel: {
            fontSize: half,
          },
        },
        yAxis: {
          axisLabel: {
            fontSize: half,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [half, half, 0, 0],
            },
          },
        ],
      });
      this.chartInstance.resize();
    },
    ZoomInterval() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.endValue < this.RetData.length) {
          this.startValue++;
          this.endValue++;
        } else {
          this.startValue = 0;
          this.endValue = 6;
        }
        this.updateChart();
      }, 1500);
    },
  },
};
</script>
<style scoped>
.rank-bar,
.rank-chart {
  width: 100%;
  height: 100%;
}
</style>