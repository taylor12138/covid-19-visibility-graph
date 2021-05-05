<template>
  <div class="rank-five-page">
    <rank-five></rank-five>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import BackScreen from "@/components/backScreen.vue";
import RankFive from "./rankFiveCom/RankFive.vue";
export default {
  name: "RankFivePage.vue",
  components: {
    RankFive,
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
.rank-five-page {
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