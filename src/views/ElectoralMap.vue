<script setup>
import { ref, onMounted } from "vue";
import TabButton from "@/components/Common/TabButton.vue";
import TaiwanOptions from "@/components/AreaSelected/index.vue";
import useCsvData from "@/utils/useCsvData";
// import useCsvData from "@/assets/csvData/useCsvData.js";
// president / legislator
const dataName = ref("president");
const { getBaseData, getVoteData } = useCsvData();
onMounted(async () => {
  await getBaseData();
  await getVoteData(dataName.value);
});
</script>
<template>
  <div :class="['px-[48px] py-[40px]']">
    <div :class="['mb-[20px]']">
      <TabButton
        :active="dataName === 'president'"
        :class="['mr-[20px]']"
        @click="dataName = 'president'"
      >
        第15任 總統副總統大選
      </TabButton>
      <TabButton
        :active="dataName === 'legislator'"
        @click="dataName = 'legislator'"
      >
        第10任 立法委員選舉
      </TabButton>
    </div>
    <TaiwanOptions></TaiwanOptions>
  </div>
</template>
