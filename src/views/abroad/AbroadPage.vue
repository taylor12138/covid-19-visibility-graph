<template>
  <div class="abroad-page">
    <abroad></abroad>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import Abroad from "./abroadCom/Abroad";
import backScreen from "@/components/backScreen.vue";
export default {
  name: "AbroadPage",
  components: {
    Abroad,
    backScreen,
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
.abroad-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.back-screen {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
</style>