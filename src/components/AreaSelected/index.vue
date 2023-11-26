<script setup>
import { ref, computed } from "vue";
import { useVoteDataStore } from "@/stores/voteData";
import _ from "lodash";
import Select from "./Select.vue";
import Button from "@/components/Common/Button.vue";

const store = useVoteDataStore();
const city = computed({
  get: () => store.city,
  set: val => {
    store.city = val;
  }
});
const district = computed({
  get: () => store.district,
  set: val => {
    store.district = val;
  }
});
const village = computed({
  get: () => store.village,
  set: val => {
    store.village = val;
  }
});
const voteData = computed(() => store.voteData);
const cityList = computed(() => voteData.value.cityList);
const districts = computed(() => store.districts);
const villages = computed(() => store.villages);
</script>
<script>
export default {
  name: "AreaSelected"
};
</script>
<template>
  <div :class="['flex items-center gap-[20px]']">
    <Select :list="cityList" v-model="city"></Select>
    <Select :list="districts" v-model="district"></Select>
    <Select :list="villages" v-model="village"></Select>
    <Button
      iconName="reset"
      svgClass="w-[24px] h-[24px]"
      @click="city = null"
    ></Button>
  </div>
</template>
