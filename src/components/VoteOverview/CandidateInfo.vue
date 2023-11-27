<script setup>
import ViewVoteData from "../Common/ViewVoteData.vue";

const props = defineProps({
  dataList: {
    type: Array,
    require: true
  }
});
</script>
<template>
  <ul>
    <ViewVoteData
      v-for="data in dataList"
      :key="data.id"
      :dataList="dataList"
      :data="data"
    ></ViewVoteData>
  </ul>
</template>