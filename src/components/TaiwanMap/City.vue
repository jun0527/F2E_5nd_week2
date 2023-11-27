<script setup>
import SvgIcon from "@/components/Common/SvgIcon.vue";
import { useVoteDataStore } from "@/stores/voteData";
import { computed } from "vue";
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
const useClass = computed(() => {
  const colorList = {
    "#DFA175": "text-brown hover:text-brown_hover",
    "#84CB98": "text-green hover:text-green_hover",
    "#8894D8": "text-blue hover:text-blue_hover"
  };
  return `${colorList[props.data.color]} cursor-pointer`;
});
</script>
<template>
  <div
    :class="['city', 'absolute']"
    :style="{
      top: `${data.mapData.top}px`,
      left: `${data.mapData.left}px`
    }"
  >
    <SvgIcon
      :name="props.data.value"
      :useClass="useClass"
      :style="{
        width: `${data.mapData.w}px`,
        height: `${data.mapData.h}px`
      }"
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