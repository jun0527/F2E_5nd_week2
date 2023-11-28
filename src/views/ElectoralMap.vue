<script setup>
import { ref, computed, onMounted } from "vue";
import TabButton from "@/components/Common/TabButton.vue";
import TaiwanOptions from "@/components/AreaSelected/index.vue";
import VoteOverview from "@/components/VoteOverview/index.vue";
import TaiwanMap from "@/components/TaiwanMap/index.vue";
import ViewVoteArea from "@/components/ViewVoteArea/index.vue";
import HintArea from "@/components/HintArea/index.vue";
import useCsvData from "@/utils/useCsvData";
import { useVoteDataStore } from "@/stores/voteData";
const store = useVoteDataStore();
const year = ref("2020");
const { getAllVoteData } = useCsvData();
const city = computed(() => store.city);
onMounted(async () => {
  await getAllVoteData(year.value);
  store.isLoadAllData = true;
});
</script>
<template>
  <div
    :class="[
      'max-w-[685px] lg:max-w-[1024px] xl:max-w-[1440px]',
      'px-[24px] py-[20px] md:px-[48px] md:py-[40px] mx-auto'
    ]"
  >
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
    <VoteOverview :class="['block xl:hidden']"></VoteOverview>
    <div
      :class="[
        'flex flex-col lg:flex-row justify-between items-center lg:items-start'
      ]"
    >
      <VoteOverview :class="['hidden xl:block']"></VoteOverview>
      <TaiwanMap :class="['mb-[20px] lg:mb-0']"></TaiwanMap>
      <HintArea v-if="!city" :class="['w-full lg:w-[260px]']"></HintArea>
      <ViewVoteArea v-else :class="['w-full lg:w-[260px]']"></ViewVoteArea>
    </div>
  </div>
</template>
