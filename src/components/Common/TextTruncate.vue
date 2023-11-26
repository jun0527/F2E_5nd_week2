<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ""
  }
});
</script>
<template>
  <div :title="props.text">
    <p :class="['w-full', 'truncate']">{{ props.text }}</p>
  </div>
</template>