<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
const props = defineProps({
  data: {
    type: Object,
    requite: true
  }
});
const pieChart = ref(null);
const data = {
  datasets: [props.data]
};
const drawChart = () => {
  new Chart(pieChart.value, {
    type: "doughnut",
    data,
    options: {
      events: []
    }
  });
};
onMounted(() => {
  drawChart();
});
</script>
<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>