<script setup>
import { computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  svgClass: {
    type: String,
    default: ""
  },
  useClass: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["click:icon"]);

const iconName = computed(() => {
  return `#icon-${props.name}`;
});
const handleClick = () => {
  emit("click:icon", props.name);
};
</script>

<template>
  <div>
    <svg :class="[props.svgClass, 'svg-icon']" aria-hidden="true">
      <use
        :xlink:href="iconName"
        :class="[props.useClass]"
        @click="handleClick"
      />
    </svg>
  </div>
</template>
