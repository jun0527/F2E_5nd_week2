<script setup>
import { useVoteDataStore } from "@/stores/voteData";
import { computed } from "vue";
import VoteDataCard from "@/components/ViewVoteArea/VoteDataCard.vue";

defineOptions({
  name: "ViewVoteArea"
});
const store = useVoteDataStore();
const cityVote = computed(() => store.cityVote);
const districtVote = computed(() => store.districtVote);
const villageVote = computed(() => store.villageVote);
</script>
<template>
  <div :class="['flex lg:block', 'overflow-x-scroll']">
    <VoteDataCard
      v-if="cityVote"
      :data="cityVote"
      :class="['flex-none mr-[20px] lg:mb-[20px] lg:mr-0']"
    ></VoteDataCard>
    <VoteDataCard
      v-if="districtVote"
      :data="districtVote"
      :class="['flex-none mr-[20px] lg:mb-[20px] lg:mr-0']"
    ></VoteDataCard>
    <VoteDataCard
      v-if="villageVote"
      :data="villageVote"
      :class="['flex-none ']"
    ></VoteDataCard>
  </div>
</template>