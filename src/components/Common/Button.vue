<script setup>
import SvgIcon from "../Common/SvgIcon.vue";

const props = defineProps({
  iconName: {
    type: String
  },
  svgClass: {
    type: String,
    default: ""
  }
});
</script>
<template>
  <button
    type="button"
    :class="[
      'flex justify-between items-center',
      'bg-darkBlue text-white',
      'px-[12px] py-[4px] rounded-[8px]',
      'hover:bg-blue_dark_hover active:bg-darkBlue_dark_hover disabled:bg-white_active disabled:text-white_dark_active'
    ]"
  >
    <span :class="['t_rg']">清除</span>
    <SvgIcon
      :name="props.iconName"
      v-if="props.iconName"
      :svgClass="props.svgClass"
    ></SvgIcon>
  </button>
</template>