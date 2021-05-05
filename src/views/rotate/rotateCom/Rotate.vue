<template>
  <div class="rotate">
    <div class="rotate-chart" ref="rotate_ref"></div>
    <span class="iconfont arrow-left" @click="turnLeft" :style="fontSize"
      >&#xe6ef;</span
    >
    <span class="iconfont arrow-right" @click="turnRight" :style="fontSize"
      >&#xe6ed;</span
    >
  </div>
</template>
<script>
import { getData } from "@/network/spiderData";
import adapter from "@/common/CommonAdapter.js"; //公共适配
import { mapState } from "vuex"; //公共主题切换
import { themeListener } from "@/common/mixin.js"; //公共主题切换
export default {
  name: "Rotate",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: [], //返回的数据
      MyData: [], //经过处理后的数据
      titles: [
        "北上广深累计确诊人数",
        "北上广深治愈人数",
        "北上广深现存确诊人数",
        "北上广深累计死亡人数",
      ],
      currentIndex: 0, //当前展示的数据索引号
      titleFontSize: 0, //当前适配的文字大小
    };
  },
  computed: {
    fontSize() {
      let Textcolor = "white";
      if (this.theme === "vintage") Textcolor = "black";
      return { fontSize: this.titleFontSize / 2 + "px", color: Textcolor };
    },
    // 使用辅助函数mapState，将vuex的state属性化为己用
    ...mapState(["theme"]),
  },
  mounted() {
    // 初始化图表
    this.initChart();
    // 获取数据
    this.getData();
    //自适应浏览器窗口大小，可惜resize会引起reflow，降低性能
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    // 防止内存泄漏
    window.removeEventListener("resize", this.screenAdapter);
  },
  // 使用mixin导入公共的watcher,监听主题变化
  mixins: [themeListener],
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.rotate_ref,
        this.theme
      );
      //对图表的配置进行初始化
      this.chartInstance.setOption(this.initOption());
    },
    getData() {
      getData().then((res) => {
        // console.log(res);
        // 筛选北上广深城市
        let nowArr = res.data.getAreaStat;
        let n = res.data.getAreaStat.length;
        for (let i = 0; i < n; i++) {
          if (
            nowArr[i].provinceName === "上海市" ||
            nowArr[i].provinceName === "北京市"
          )
            this.RetData.push(nowArr[i]);
          else if (nowArr[i].provinceName === "广东省") {
            for (let j = 0; j < nowArr[i].cities.length; j++) {
              if (
                nowArr[i].cities[j].cityName === "广州" ||
                nowArr[i].cities[j].cityName === "深圳"
              )
                this.RetData.push(nowArr[i].cities[j]);
            }
          }
        }

        // console.log(this.RetData);
        this.DealData();
        this.updateChart();
        // 开头先调一次
        this.screenAdapter();
      });
    },
    // 数据处理
    DealData() {
      // 处理后的累计确诊人数数据
      let confirmedCount = this.RetData.map((item) => {
        return {
          name: item.cityName || item.provinceName,
          value: item.confirmedCount,
        };
      });
      // 处理后的治愈人数人数数据
      let curedCount = this.RetData.map((item) => {
        return {
          name: item.cityName || item.provinceName,
          value: item.curedCount,
        };
      });
      // 处理后的现存确诊人数数据
      let currentConfirmedCount = this.RetData.map((item) => {
        return {
          name: item.cityName || item.provinceName,
          value: item.currentConfirmedCount,
        };
      });
      // 处理后的死亡人数人数数据
      let deadCount = this.RetData.map((item) => {
        return {
          name: item.cityName || item.provinceName,
          value: item.deadCount,
        };
      });
      this.MyData = [
        confirmedCount,
        curedCount,
        currentConfirmedCount,
        deadCount,
      ];
      // console.log(this.MyData);
    },
    initOption() {
      return {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
          },
        ],
      };
    },
    updateChart() {
      const legendData = this.MyData[this.currentIndex].map(
        (item) => item.name
      );
      this.chartInstance.setOption({
        title: {
          text: "▍" + this.titles[this.currentIndex],
          top: 20,
        },
        legend: {
          top: "15%",
          data: legendData,
        },
        series: [
          {
            data: this.MyData[this.currentIndex],
          },
        ],
      });
    },
    turnLeft() {
      if (this.currentIndex === 0) this.currentIndex = this.MyData.length - 1;
      else this.currentIndex--;
      this.updateChart();
    },
    turnRight() {
      this.currentIndex = (this.currentIndex + 1) % this.MyData.length;
      this.updateChart();
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.rotate_ref.offsetWidth / 100) * 3.6;
      const half = this.titleFontSize / 2;
      // 和分辨率大小相关的配置
      this.chartInstance.setOption(adapter(this.titleFontSize));
      this.chartInstance.setOption({
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: half,
          textStyle: {
            fontSize: half,
          },
        },
        series: [
          {
            radius: this.titleFontSize * 4.5,
            center: ["50%", "60%"],
          },
        ],
      });
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped>
.rotate,
.rotate-chart {
  width: 100%;
  height: 100%;
}
.arrow-left {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  color: #fff;
  cursor: pointer;
}
.arrow-right {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(-50%, -50%);
  color: #fff;
  cursor: pointer;
}
</style>