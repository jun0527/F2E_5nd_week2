<script setup>
import { ref } from "vue";

const isExtend = ref(false);
const dropdownBtn = ref(null);
const clickOther = e => {
  if (!isExtend.value) return;
  if (dropdownBtn.value.contains(e.target)) return;
  isExtend.value = false;
  window.removeEventListener("click", clickOther);
};
const handleClick = () => {
  isExtend.value = !isExtend.value;
  if (isExtend.value) {
    window.addEventListener("click", clickOther);
  }
};
</script>
<template>
  <div>
    <div ref="dropdownBtn" :class="['relative']">
      <slot
        :isExtend="isExtend"
        :handleClick="handleClick"
        name="button"
      ></slot>
    </div>
    <div v-if="isExtend" :class="['absolute']">
      <slot></slot>
    </div>
  </div>
</template>
