<script setup>
import { ref, computed } from "vue";
import { useVoteDataStore } from "@/stores/voteData";
import _ from "lodash";
import Select from "./Select.vue";
import Button from "@/components/Common/Button.vue";

defineOptions({
  name: "AreaSelected"
});
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
<template>
  <div :class="['w-full flex items-center gap-[12px] md:gap-[20px]']">
    <div :class="['w-full md:w-auto md:flex items-center gap-[20px]']">
      <Select
        :list="cityList"
        v-model="city"
        width="100%"
        :class="['mb-[12px] md:mb-0']"
      ></Select>
      <div :class="['w-full md:w-auto flex items-center gap-[20px]']">
        <Select
          :list="districts"
          v-model="district"
          width="100%"
          :class="['w-full']"
        ></Select>
        <Select
          :list="villages"
          v-model="village"
          width="100%"
          :class="['w-full']"
        ></Select>
      </div>
    </div>
    <Button
      iconName="reset"
      svgClass="w-[24px] h-[24px]"
      @click="city = null"
      :class="['w-[36px] h-[84px] md:w-[88px] md:h-auto']"
    ></Button>
  </div>
</template>
