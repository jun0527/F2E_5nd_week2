import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import _ from "lodash"

export const useVoteDataStore = defineStore("voteData", () => {
  const voteData = ref({});
  const city = ref("");
  const district = ref("");
  const village = ref("")
  const ballotData = ref({});
  const candidateData = ref({});

  watch(city, (newVal, oldVal) => {
    if (!_.isEqual(newVal, oldVal)) {
      district.value = null;
    }
  })
  watch(district, (newVal, oldVal) => {
    if (!_.isEqual(newVal, oldVal)) {
      village.value = null;
    }
  })
  const getIndex = (array, val) => {
    return _.findIndex(array, item => item.num === val);
  };
  const districts = computed(() => {
    const index = getIndex(voteData.value.cityList, city.value);
    if (index === -1) return [];
    const item = voteData.value.cityList[index];
    return item ? item.districts : [];
  });
  const villages = computed(() => {
    const index = getIndex(districts.value, district.value);
    if (index === -1) return [];
    const item = districts.value[index];
    return item ? item.villages : [];
  });

  const totalVote = computed(() => voteData.value.vote);
  const cityVote = computed(() => {
    const index = getIndex(voteData.value.cityList, city.value);
    if (index === -1) return null
    const cityData = voteData?.value?.cityList[index];
    const newData = {};
    newData.name = cityData.name;
    newData.vote = cityData.vote;
    return cityData ? newData : null;
  });
  const districtVote = computed(() => {
    const index = getIndex(districts.value, district.value);
    if (index === -1) return null
    const districtData = districts?.value[index];
    const newData = {};
    newData.name = districtData.name;
    newData.vote = districtData.vote;
    return districtData ? newData : null;
  });
  const villageVote = computed(() => {
    const index = getIndex(villages.value, village.value);
    if (index === -1) return null
    const villageData = villages?.value[index];
    const newData = {};
    newData.name = villageData.name;
    newData.vote = villageData.vote;
    return villageData ? newData : null;
  });

  const isLoadAllData = ref(false);

  return {
    voteData,
    candidateData,
    city,
    district,
    village,
    ballotData,

    districts,
    villages,
    
    totalVote,
    cityVote,
    districtVote,
    villageVote,

    isLoadAllData
  };
});
