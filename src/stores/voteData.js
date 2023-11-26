import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import _ from "lodash"

export const useVoteDataStore = defineStore("voteData", () => {
  const voteBase = ref([]);
  const voteData = ref({});
  const city = ref("");
  const district = ref("");
  const village = ref("")

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
  const cityVote = computed(() => {
    const index = getIndex(voteData.value.cityList, city.value);
    const cityData = voteData.value.cityList[index];
    return cityData ? cityData.vote : null;
  });
  const districtVote = computed(() => {
    const index = getIndex(districts.value, district.value);
    const districtData = districts.value[index];
    return districtData ? districtData.vote : null;
  });
  const villageVote = computed(() => {
    const index = getIndex(villages.value, village.value);
    const villageData = villages.value[index];
    return villageData ? villageData.vote : null;
  });

  return {
    voteBase,
    voteData,
    city,
    district,
    village,

    districts,
    villages,

    cityVote,
    districtVote,
    villageVote
  };
});
