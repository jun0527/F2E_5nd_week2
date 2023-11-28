<script setup>
import PieChart from "../Common/PieChart.vue";
import CandidateInfo from "./CandidateInfo.vue";
import SvgIcon from "../Common/SvgIcon.vue";
import { useVoteDataStore } from "@/stores/voteData";
import { ref, computed } from "vue";
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

const isExtend = ref(false);
</script>
<template>
  <div
    :class="[
      'max-w-[616px] xl:w-[270px]',
      'bg-white',
      'rounded-[8px] mb-[20px] xl:mb-0'
    ]"
  >
    <div
      :class="[
        'flex justify-between items-center',
        'cursor-pointer xl:cursor-auto',
        'p-[12px] md:p-[20px]'
      ]"
      @click="isExtend = !isExtend"
    >
      <h2 :class="['h6 font-semibold']">投票概況</h2>
      <SvgIcon
        :name="isExtend ? 'dropdown' : 'right'"
        :class="['xl:hidden', 'w-[24px] h-[24px]']"
      ></SvgIcon>
    </div>
    <div
      :class="[
        'hidden xl:block',
        'px-[12px] pb-[12px] md:px-[20px] md:pb-[20px]',
        {
          '!block': isExtend
        }
      ]"
    >
      <div
        v-if="isLoadAllData"
        :class="['flex items-center xl:block', 'mb-[20px] xl:mb-[40px]']"
      >
        <div :class="['flex items-center', 'mr-[12px] xl:mr-0 xl:mb-[20px]']">
          <PieChart
            :data="ballotArray"
            :class="[
              'w-[72px] h-[72px] sm:w-[120px] sm:h-[120px]',
              'mt-[15px] mr-[12px] sm:mr-[20px] xl:mt-0'
            ]"
          ></PieChart>
          <div :class="['flex flex-col items-center']">
            <span :class="['h6 font-semibold']">
              {{ ballotData.voterTurnout }}%
            </span>
            <span :class="['t_sm leading-[1.2] md:t_rg md:leading-[1.4]']">
              投票率
            </span>
          </div>
        </div>
        <div>
          <p
            :class="['t_sm leading-[1.2] md:t_rg md:leading-[1.4]', 'mb-[8px]']"
          >
            投票數
            <span :class="['t_xs font-semibold', 'pl-[8px]']">
              {{ getNumberComma(ballotData.total) }}票
            </span>
          </p>
          <p
            :class="['t_sm leading-[1.2] md:t_rg md:leading-[1.4]', 'mb-[8px]']"
          >
            無效票數
            <span :class="['t_xs font-semibold', 'pl-[8px]']">
              {{ getNumberComma(ballotData.invalid) }}票
            </span>
          </p>
          <p :class="['t_sm leading-[1.2] md:t_rg md:leading-[1.4]']">
            有效票數
            <span :class="['t_xs font-semibold', 'pl-[8px]']">
              {{ getNumberComma(ballotData.valid) }}票
            </span>
          </p>
        </div>
      </div>
      <div v-if="isLoadAllData" :class="['flex items-center xl:block']">
        <PieChart
          :data="voteArray"
          :class="[
            'w-[72px] h-[72px] sm:w-[120px] sm:h-[120px]',
            'mr-[12px] mt-[-15px] xl:mr-0 xl:mb-[20px] xl:mt-0'
          ]"
        ></PieChart>
        <CandidateInfo :dataList="totalVoteArray"></CandidateInfo>
      </div>
    </div>
  </div>
</template>