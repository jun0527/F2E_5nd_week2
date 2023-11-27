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
  <div>
    <VoteDataCard
      v-if="cityVote"
      :data="cityVote"
      :class="['mb-[20px]']"
    ></VoteDataCard>
    <VoteDataCard
      v-if="districtVote"
      :data="districtVote"
      :class="['mb-[20px]']"
    ></VoteDataCard>
    <VoteDataCard v-if="villageVote" :data="villageVote"></VoteDataCard>
  </div>
</template>