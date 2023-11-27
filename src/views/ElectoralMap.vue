<script setup>
import { ref, onMounted } from "vue";
import TabButton from "@/components/Common/TabButton.vue";
import TaiwanOptions from "@/components/AreaSelected/index.vue";
import VoteOverview from "@/components/VoteOverview/index.vue";
import TaiwanMap from "@/components/TaiwanMap/index.vue";
import ViewVoteArea from "@/components/ViewVoteArea/index.vue";
import useCsvData from "@/utils/useCsvData";
import { useVoteDataStore } from "@/stores/voteData";
const store = useVoteDataStore();
const year = ref("2020");
const { getAllVoteData } = useCsvData();
onMounted(async () => {
  await getAllVoteData(year.value);
  store.isLoadAllData = true;
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
    <TaiwanOptions :class="['mb-[20px]']"></TaiwanOptions>
    <div :class="['flex justify-between']">
      <VoteOverview></VoteOverview>
      <TaiwanMap></TaiwanMap>
      <ViewVoteArea></ViewVoteArea>
    </div>
  </div>
</template>
