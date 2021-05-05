<template>
  <div class="rotate-page">
    <rotate></rotate>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import BackScreen from "@/components/backScreen.vue";
import Rotate from "./rotateCom/Rotate.vue";
export default {
  name: "RotatePage",
  components: {
    Rotate,
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
.rotate-page {
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
