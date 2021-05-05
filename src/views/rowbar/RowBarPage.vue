<template>
  <div class="row-bar-page">
    <row-bar></row-bar>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import BackScreen from "@/components/backScreen.vue";
import RowBar from "./rowbarCom/RowBar.vue";
export default {
  name: "RowBarPage",
  components: {
    RowBar,
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
.row-bar-page {
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