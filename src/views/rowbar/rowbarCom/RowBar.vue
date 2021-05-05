<template>
  <div class="row-bar">
    <div class="row-chart" ref="rowbar_ref"></div>
  </div>
</template>
<script>
import { getData } from "@/network/spiderData";
import adapter from "@/common/BarAdapter.js";
import { mapState } from "vuex";
import { themeListener } from "@/common/mixin.js";

export default {
  name: "RowBar",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: null, // 返回数据
      currentPage: 1, //当前页数
      totalPage: 0, //总页数
      timer: null, //计时器
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    //自适应浏览器窗口大小，可惜resize会引起reflow，降低性能
    window.addEventListener("resize", this.screenAdapter);
    // 开头先调一次
    this.screenAdapter();
  },
  destroyed() {
    // 页面里开始消除定时器、解绑监听器，防止内存泄漏
    clearInterval(this.timer);
    window.removeEventListener("resize", this.screenAdapter);
  },
  computed: {
    // 使用辅助函数mapState，将vuex的state属性化为己用
    ...mapState(["theme"]),
  },
  // 使用mixin导入公共的watcher,监听主题变化
  mixins: [themeListener],
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.rowbar_ref,
        this.theme
      );
      //对图表的配置进行初始化
      this.chartInstance.setOption(this.initOption());
      // 初始化图表的时候顺便绑定事件
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.chartInstance.on("mouseout", () => {
        this.Interval();
      });
    },
    // 获取数据
    getData() {
      getData().then((res) => {
        // 获取广东省疫情数据
        let guangdong = res.data.getAreaStat.filter(
          (val) => val.provinceName === "广东省"
        );
        // console.log(guangdong);
        this.RetData = guangdong[0].cities;
        this.dataSort();
        this.totalPage = Math.ceil(this.RetData.length / 7); // 计算总页数
        this.updateChart();
        this.Interval(); //开启定时器
      });
    },
    //对数据进行排序(从小到大)
    dataSort() {
      // console.log(this.RetData);
      this.RetData.sort((a, b) => {
        return a.confirmedCount - b.confirmedCount;
      });
    },
    // 更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 7;
      const end = this.currentPage * 7;
      let showData = this.RetData.slice(start, end);
      // 地区
      const areaName = showData.map((item) => {
        return item.cityName;
      });
      //累计确诊人数
      const areaCount = showData.map((item) => {
        return item.confirmedCount;
      });
      // chart配置信息
      const option = {
        yAxis: {
          data: areaName,
        },
        series: [
          {
            data: areaCount,
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
    // 定时器切换图表
    Interval() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) this.currentPage = 1;
        this.updateChart();
      }, 2000);
    },
    //初始化chart配置项
    initOption() {
      return {
        title: {
          text: "▍广东省疫情确诊累计人数",
          top: 20,
        },
        grid: {
          // 设置坐标轴位置
          top: "20%",
          left: "8%",
          right: "6%",
          bottom: "6%",
        },
        tooltip: {
          // 光标触发事件
          trigger: "item",
        },
        toolbox: {
          feature: {
            //可以直接到导出图片的功能
            // saveAsImage: {},
          },
        },
        xAxis: {
          type: "value",
          scale: true,
        },
        yAxis: {
          type: "category",
        },
        series: [
          {
            name: "累计确诊人数",
            type: "bar",
            // 显示bar右边的数值
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
              // 渐变颜色，需要new一个实例，同时携带颜色渐变方向、不同百分比下颜色的值的参数
              // color:new this.$echarts.graphic,LinearGradient(x1, y1, x2, y2, [])
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  //百分之0下的颜色
                  offset: 0,
                  color: "#7700BB",
                },
                {
                  //百分之100下的颜色
                  offset: 1,
                  color: "#E63F00",
                },
              ]),
            },
          },
        ],
      };
    },
    //根据浏览器当前视图大小适配
    screenAdapter() {
      const titleFontSize = (this.$refs.rowbar_ref.offsetWidth / 100) * 3.6;
      let half = titleFontSize / 2;
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
      });
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped>
.row-bar,
.row-chart {
  width: 100%;
  height: 100%;
}
</style>