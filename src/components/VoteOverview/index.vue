<script setup>
import PieChart from "../Common/PieChart.vue";
import CandidateInfo from "./CandidateInfo.vue";
import { useVoteDataStore } from "@/stores/voteData";
import { computed } from "vue";
import useNumberData from "@/utils/useNumberData";
import _ from "lodash";

defineOptions({
  name: "VoteOverview"
});
const store = useVoteDataStore();
const { getNumberComma } = useNumberData();
const isLoadAllData = computed(() => store.isLoadAllData);
const ballotData = computed(() => store.ballotData);
const ballotArray = computed(() => {
  return {
    data: [
      Number(ballotData.value.voterTurnout).toFixed(1),
      (100 - Number(ballotData.value.voterTurnout)).toFixed(1)
    ],
    backgroundColor: ["#262E49", "#D9D9D9"]
  };
});
const totalVote = computed(() => store.totalVote);
const totalVoteArray = computed(() => {
  return _.orderBy(
    [
      { ...totalVote.value.vote1, id: 1 },
      { ...totalVote.value.vote2, id: 2 },
      { ...totalVote.value.vote3, id: 3 }
    ],
    ["num"],
    ["desc"]
  );
});
const voteArray = computed(() => {
  const data = totalVoteArray.value;
  return {
    data: [data[0].num, data[1].num, data[2].num],
    backgroundColor: [data[0].color, data[1].color, data[2].color]
  };
});
</script>
<template>
  <div :class="['w-[270px]', 'bg-white', 'p-[20px]']">
    <h2 :class="['h6 font-semibold', 'mb-[20px]']">投票概況</h2>
    <div v-if="isLoadAllData" :class="['mb-[40px]']">
      <div :class="['flex items-center', 'mb-[20px]']">
        <PieChart
          :data="ballotArray"
          :class="['w-[120px] h-[120px]', 'mr-[20px]']"
        ></PieChart>
        <div :class="['flex flex-col items-center']">
          <span :class="['h6 font-semibold']">
            {{ ballotData.voterTurnout }}%
          </span>
          <span :class="['t_rg']">投票率</span>
        </div>
      </div>
      <p :class="['t_rg']">
        投票數
        <span :class="['t_xs font-semibold', 'pl-[8px]']">
          {{ getNumberComma(ballotData.total) }}票
        </span>
      </p>
      <p :class="['t_rg']">
        無效票數
        <span :class="['t_xs font-semibold', 'pl-[8px]']">
          {{ getNumberComma(ballotData.invalid) }}票
        </span>
      </p>
      <p :class="['t_rg']">
        有效票數
        <span :class="['t_xs font-semibold', 'pl-[8px]']">
          {{ getNumberComma(ballotData.valid) }}票
        </span>
      </p>
    </div>
    <div v-if="isLoadAllData">
      <PieChart
        :data="voteArray"
        :class="['w-[120px] h-[120px]', 'mb-[20px]']"
      ></PieChart>
      <CandidateInfo :dataList="totalVoteArray"></CandidateInfo>
    </div>
  </div>
</template>