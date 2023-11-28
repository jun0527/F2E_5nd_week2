<script setup>
import ViewVoteData from "../Common/ViewVoteData.vue";
import { computed } from "vue";
import _ from "lodash";
const props = defineProps({
  data: {
    type: Object,
    require: true
  }
});
const totalVoteArray = computed(() => {
  return _.orderBy(
    [
      { ...props.data.vote.vote1, id: 1 },
      { ...props.data.vote.vote2, id: 2 },
      { ...props.data.vote.vote3, id: 3 }
    ],
    ["num"],
    ["desc"]
  );
});
const cardClass = computed(() => {
  const colorList = {
    "#DFA175": "border-brown bg-brown_light_hover",
    "#84CB98": "border-green bg-green_light_hover",
    "#8894D8": "border-blue bg-blue_light_hover"
  };
  return `${colorList[totalVoteArray.value[0]?.color]}`;
});
</script>
<template>
  <div
    :class="[
      cardClass,
      'w-[260px] border-[2px] rounded-[8px]',
      'px-[20px] py-[12px]'
    ]"
  >
    <p :class="['h6 font-semibold']">{{ data.name }}</p>
    <ul>
      <ViewVoteData
        v-for="data in totalVoteArray"
        :key="data.id"
        :dataList="totalVoteArray"
        :data="data"
      ></ViewVoteData>
    </ul>
  </div>
</template>