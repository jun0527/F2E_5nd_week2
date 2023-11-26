<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <button
    :class="[
      'h6 font-semibold text-white_dark hover:text-darkBlue',
      'group',
      {
        '!text-black': props.active
      }
    ]"
  >
    <slot></slot>
    <div
      :class="[
        'w-full',
        'border-t-[4px] border-transparent group-hover:border-white_dark',
        'mt-[12px]',
        {
          '!border-black': props.active
        }
      ]"
    ></div>
  </button>
</template>
