<script setup>
import { useVoteDataStore } from "@/stores/voteData";
import { cityPosition } from "./cityPositionData";
import { computed } from "vue";
import _ from "lodash";
import City from "./City.vue";
defineOptions({
  name: "TaiwanMap"
});
const store = useVoteDataStore();
const isLoadAllData = computed(() => store.isLoadAllData);
const cityList = computed(() => store.voteData.cityList);
const cityMapData = computed(() => {
  const mapData = _.map(cityPosition, city => {
    const index = _.findIndex(cityList.value, item => item.name === city.name);
    if (index === -1) return city;
    const cityData = cityList.value[index];
    const voteArr = [
      cityData.vote.vote1,
      cityData.vote.vote2,
      cityData.vote.vote3
    ];
    const color = _.maxBy(voteArr, item => item.num)?.color;
    return {
      ...city,
      num: cityData?.num,
      color
    };
  });
  return mapData;
});
</script>
<template>
  <div
    :class="['w-[344px] h-[472px] sm:w-[510px] sm:h-[700px] relative']"
    v-if="isLoadAllData"
  >
    <City v-for="city in cityMapData" :key="city.num" :data="city"></City>
  </div>
</template>