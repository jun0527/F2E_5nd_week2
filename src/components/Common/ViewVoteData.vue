<script setup>
import _ from "lodash";
import { computed } from "vue";
import { useVoteDataStore } from "@/stores/voteData";
import useNumberData from "@/utils/useNumberData";
const { getNumberComma } = useNumberData();
const props = defineProps({
  dataList: {
    type: Array,
    require: true
  },
  data: {
    type: Object,
    require: true
  }
});
const store = useVoteDataStore();
const candidateData = computed(() => store.candidateData);
const totalBallot = computed(() => {
  let ballot = 0;
  _.forEach(props.dataList, data => {
    ballot += data.num;
  });
  return ballot;
});
const getVotePercentage = vote => {
  return ((vote / totalBallot.value) * 100).toFixed(2);
};
</script>
<template>
  <li :class="['flex items-center', 'mb-[8px]']">
    <span
      :class="[
        'w-[24px] h-[24px] block',
        'flex justify-center items-center',
        't_xs text-white',
        'rounded-full',
        'mr-[15px]'
      ]"
      :style="{ background: data.color }"
    >
      {{ data.id }}
    </span>
    <div :class="['flex flex-col w-[94px]']">
      <span :class="['t_rg font-semibold']">
        {{ candidateData[`vote${data.id}`].partName }}
      </span>
      <span :class="['t_xs']">
        {{ candidateData[`vote${data.id}`].name }} |
        {{ candidateData[`vote${data.id}`].deputy }}
      </span>
    </div>
    <div
      :class="['w-[2px] h-[32px]', 'mr-[14px]']"
      :style="{ background: data.color }"
    ></div>
    <div :class="['flex flex-col']">
      <span :class="['t_rg font-semibold']">
        {{ getVotePercentage(data.num) }}%
      </span>
      <span :class="['t_xs']">{{ getNumberComma(data.num) }}票</span>
    </div>
  </li>
</template>