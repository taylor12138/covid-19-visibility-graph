<template>
  <div class="screen-container" :style="backcolor">
    <header class="screen-header">
      <div>
        <img src="~@/../public/static/img/header_border_dark.png" alt="" />
      </div>
      <span class="title"
        >疫情实时播报系统 <img src="~@/../public/static/img/logo.png" alt=""
      /></span>
      <div class="title-right">
        <img
          src="~@/../public/static/img/qiehuan_dark.png"
          class="qiehuan"
          @click="clickChangeTheme"
        />
        <span class="datetime">{{ curTime }}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <!-- 各省疫情确诊累计（纵） -->
          <rank-bar-page :showTag="false"></rank-bar-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/rankbar" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
        <div id="left-bottom">
          <!-- 北上广深饼图 -->
          <rotate-page :showTag="false"></rotate-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/rotate" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 中国地图疫情总况-->
          <map-page :showTag="false"></map-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/map" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
        <div id="middle-bottom">
          <!-- 五大常任理事国疫情-->
          <rank-five-page :showTag="false"></rank-five-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/five" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <!-- 广东省各市区确诊累计（横） -->
          <row-bar-page :showTag="false"></row-bar-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/rowbar" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
        <div id="right-bottom">
          <!-- 国外疫情环状图呈现 -->
          <abroad-page :showTag="false"></abroad-page>
          <!-- 放大标签 -->
          <div class="resize">
            <router-link to="/abroad" tag="div">
              <span :class="['iconfont', 'icon-expand-alt']"></span>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AbroadPage from "../abroad/AbroadPage.vue";
import MapPage from "../map/MapPage.vue";
import RankBarPage from "../rankbar/RankBarPage.vue";
import RankFivePage from "../rankFive/RankFivePage.vue";
import RotatePage from "../rotate/RotatePage.vue";
import RowBarPage from "../rowbar/RowBarPage.vue";
export default {
  name: "ScreenPage",
  components: {
    AbroadPage,
    RankBarPage,
    RowBarPage,
    MapPage,
    RotatePage,
    RankFivePage,
  },
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.timer = new Date();
  },
  computed: {
    backcolor() {
      let Textcolor = "#161522";
      if (this.$store.state.theme === "vintage") Textcolor = "#9ab9b4";
      if (this.$store.state.theme === "dark") Textcolor = "#a78947";
      if (this.$store.state.theme === "purple-passion") Textcolor = "#1f3a52";
      return {
        backgroundColor: Textcolor,
      };
    },
    curTime() {
      if (this.timer) {
        return `${this.timer.getFullYear()}年${
          this.timer.getMonth() + 1
        }月${this.timer.getDate()}日`;
      } else return "";
    },
  },
  methods: {
    clickChangeTheme() {
      this.$store.commit("changeTheme");
    },
  },
};
</script>
<style lang="less" scoped>
// 全屏样式的定义

// 标题部分
.screen-header {
  width: 100%;
  height: 10%;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-25%, -70%);
    img {
      width: 8%;
      height: 8%;
      vertical-align: middle;
    }
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 34%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
}
// 主体部分
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
}

.screen-body {
  width: 100%;
  height: 88%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 36%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 20px;
      width: 100%;
      height: 40%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 43px;
      position: relative;
    }
  }
}
// 放大图标的样式
.resize {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  color: #dd7128;
}
</style>