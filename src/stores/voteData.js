import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import useCsvData from "@/utils/useCsvData";

export const useVoteDataStore = defineStore("voteData", () => {
  const voteBase = ref([]);
  const voteData = ref({});

  return { voteBase, voteData };
});
