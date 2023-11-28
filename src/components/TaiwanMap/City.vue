<script setup>
import SvgIcon from "@/components/Common/SvgIcon.vue";
import { useVoteDataStore } from "@/stores/voteData";
import { ref, computed } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default: []
  }
});
const store = useVoteDataStore();
const city = computed({
  get: () => store.city,
  set: val => {
    store.city = val;
  }
});
const activeClass = computed(() => {
  const colorList = {
    "#DFA175": "text-brown_active",
    "#84CB98": "text-green_active",
    "#8894D8": "text-blue_active"
  };
  return city.value === props.data.num ? colorList[props.data.color] : "";
});
const useClass = computed(() => {
  const colorList = {
    "#DFA175": "text-brown hover:text-brown_hover",
    "#84CB98": "text-green hover:text-green_hover",
    "#8894D8": "text-blue hover:text-blue_hover"
  };
  return `${activeClass.value} ${colorList[props.data.color]} cursor-pointer`;
});
const bodyW = ref(document.body.clientWidth);
const handleResize = e => {
  bodyW.value = document.body.clientWidth;
};
window.addEventListener("resize", handleResize);
const positionStyle = computed(() => {
  const position = {
    top: props.data.mapData.top,
    left: props.data.mapData.left
  };

  if (bodyW.value < 640 && props.data.smallMapData) {
    position.top = props.data.smallMapData.top;
    position.left = props.data.smallMapData.left;
  }
  return {
    top: `${position.top}px`,
    left: `${position.left}px`
  };
});
const sizeStyle = computed(() => {
  const size = {
    w: props.data.mapData.w,
    h: props.data.mapData.h
  };

  if (bodyW.value < 640 && props.data.smallMapData) {
    size.w = props.data.smallMapData.w;
    size.h = props.data.smallMapData.h;
  }
  return {
    width: `${size.w}px`,
    height: `${size.h}px`
  };
});
</script>
<template>
  <div :class="['city', 'absolute']" :style="positionStyle">
    <SvgIcon
      :name="props.data.value"
      :useClass="useClass"
      :style="sizeStyle"
      @click:icon="city = props.data.num"
    ></SvgIcon>
    <!-- <test></test> -->
  </div>
</template>
<style lang="scss">
.city {
  pointer-events: none;
  use {
    pointer-events: all;
  }
}
</style>