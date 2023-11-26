<script setup>
import { ref, onMounted } from "vue";
import TabButton from "@/components/Common/TabButton.vue";
import TaiwanOptions from "@/components/AreaSelected/index.vue";
import useCsvData from "@/utils/useCsvData";
// import useCsvData from "@/assets/csvData/useCsvData.js";
// 2020 / 2016
const year = ref("2020");
const { getBaseData, getVoteData, getBallotData } = useCsvData();
onMounted(async () => {
  await getBaseData(year.value);
  await getVoteData(year.value);
  await getBallotData(year.value);
});
</script>
<template>
  <div :class="['px-[48px] py-[40px]']">
    <div :class="['mb-[20px]']">
      <TabButton
        :active="year === '2020'"
        :class="['mr-[20px]']"
        @click="year = '2020'"
      >
        第15任 總統副總統大選
      </TabButton>
      <TabButton :active="year === '2016'" @click="year = '2016'">
        第10任 立法委員選舉
      </TabButton>
    </div>
    <TaiwanOptions></TaiwanOptions>
  </div>
</template>
