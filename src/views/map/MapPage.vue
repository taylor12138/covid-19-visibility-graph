<template>
  <div class="map-page">
    <map-component></map-component>
    <back-screen class="back-screen" v-show="showTag"></back-screen>
  </div>
</template>
<script>
import BackScreen from "@/components/backScreen.vue";
import MapComponent from "./mapCom/MapComponent.vue";
export default {
  name: "MapPage",
  components: { MapComponent, BackScreen },
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
.map-page {
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