<template>
  <div class="rank-bar-page">
    <rank-bar></rank-bar>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import BackScreen from "@/components/backScreen.vue";
import RankBar from "./rankbarCom/RankBar.vue";
export default {
  name: "RankBarPage",
  components: {
    RankBar,
    BackScreen,
  },
  props: {
    showTag: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>
<style scoped>
.rank-bar-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.back-screen {
  position: absolute;
  right: 5px;
  top: 5px;
  color: white;
  cursor: pointer;
}
</style>