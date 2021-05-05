<template>
  <div class="map-com">
    <div class="map-chart" ref="map_ref"></div>
  </div>
</template>
<script>
import { getData } from "@/network/spiderData";
import adapter from "@/common/CommonAdapter.js";
import China from "@/../public/static/map/china.json";
import { mapState } from "vuex"; //公共主题切换
import { themeListener } from "@/common/mixin.js"; //公共主题切换
export default {
  name: "MapComponent",
  data() {
    return {
      chartInstance: null, // Echart对象
      RetData: [], // 返回数据
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
  computed: {
    // 使用辅助函数mapState，将vuex的state属性化为己用
    ...mapState(["theme"]),
  },
  // 使用mixin导入公共的watcher,监听主题变化
  mixins: [themeListener],
  destroyed() {
    // 防止内存泄漏，而且不移除的话，路由转换也可能引起报错
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 初始化
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      // 注册中国地图
      this.$echarts.registerMap("china", China);
      // 初始化图表配置信息
      this.chartInstance.setOption(this.initOption());
    },
    //初始化的配置信息
    initOption() {
      let Textcolor = "white";
      if (this.theme === "vintage") Textcolor = "black";
      return {
        title: {
          text: "全国covid-19疫情总况",
          left: "center",
          top: 20,
        },

        visualMap: {
          min: 0,
          max: 100,
          text: ["High", "Low"],
          textStyle: { color: Textcolor },
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            label: {
              show: true,
            },
          },
        ],
      };
    },
    //获取全国疫情数据
    getData() {
      getData().then((res) => {
        let data = res.data.getAreaStat;
        data.forEach((item) => {
          this.RetData.push({
            name: item.provinceShortName, // 省份名字
            value: item.currentConfirmedCount, //现存确诊人数
            death: item.deadCount, //累计死亡人数
            cure: item.curedCount, //累计治愈人数
          });
        });
        // 填补南海诸岛疫情数据空缺
        this.RetData.push({
          name: "南海诸岛",
          value: 0,
          death: 0,
          cure: 0,
        });
        // console.log(data);
        //等待数据到达再初始化
        this.updateChart();
      });
    },
    // 更新图表
    updateChart() {
      let curdata = this.RetData;
      const option = {
        tooltip: {
          formatter: function (params) {
            return `地区：${params.name}</br> 现存确诊：${params.value}</br> 累计死亡：${params.data.death}</br> 累计治愈：${params.data.cure}</br>`;
          },
        },
        series: [
          {
            data: curdata,
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
    //根据浏览器当前视图大小适配
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
      // 和分辨率大小相关的配置
      this.chartInstance.setOption(adapter(titleFontSize));
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped>
.map-com,
.map-chart {
  width: 100%;
  height: 100%;
}
</style>