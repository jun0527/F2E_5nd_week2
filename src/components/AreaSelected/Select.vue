<script setup>
import Dropdown from "../Common/Dropdown.vue";
import SvgIcon from "../Common/SvgIcon.vue";
import TextTruncate from "../Common/TextTruncate.vue";
import { ref, computed, onMounted } from "vue";
import _ from "lodash";
const props = defineProps({
  list: {
    type: Array,
    require: true
  },
  modelValue: {
    type: String,
    require: true
  },
  width: {
    type: String,
    default: "156px"
  },
  maxWidth: {
    type: String,
    default: "auto"
  }
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: val => {
    emit("update:modelValue", val);
  }
});
const buttonVal = computed(() => {
  const data = _.find(props.list, item => item.num === model.value);
  return data ? data.name : "請選擇";
});
const dropdownBtn = ref(null);
const listWidth = ref(0);
const handleResize = () => {
  listWidth.value = dropdownBtn.value.clientWidth;
};
window.addEventListener("resize", handleResize);
onMounted(() => {
  listWidth.value = dropdownBtn.value.clientWidth;
});
</script>
<template>
  <Dropdown>
    <template #button="{ isExtend, handleClick }">
      <button
        ref="dropdownBtn"
        type="button"
        :class="[
          'flex justify-between items-center',
          'border border-white_hover rounded-[8px]',
          'px-[12px] py-[4px]',
          'hover:border-white_dark',
          'disabled:!border-white_dark disabled:text-white_dark disabled:cursor-not-allowed',
          {
            '!border-darkBlue': isExtend
          }
        ]"
        :disabled="!props.list || props.list.length === 0"
        :style="{ width: props.width, 'max-width': props.maxWidth }"
        @click="handleClick"
      >
        <!-- <span>{{ buttonVal }}</span> -->
        <TextTruncate
          :class="['w-[95px] t_lg text-left']"
          :text="buttonVal"
        ></TextTruncate>
        <SvgIcon
          name="dropdown"
          svgClass="w-[24px] h-[24px]"
          :class="['flex-none', { 'rotate-[180deg]': isExtend }]"
        ></SvgIcon>
      </button>
    </template>
    <ul
      :style="{ width: `${listWidth}px`, 'max-width': props.maxWidth }"
      :class="[
        'max-h-[216px] overflow-y-auto',
        'bg-white',
        'border border-darkBlue rounded-[8px]',
        'mt-[4px]'
      ]"
    >
      <li
        v-for="item in props.list"
        :key="item.num"
        @click="model = item.num"
        :class="[
          't_lg',
          'cursor-pointer',
          'px-[20px] py-[4px]',
          'hover:bg-white_hover',
          {
            'bg-white_hover': item.num === model
          }
        ]"
      >
        <TextTruncate :text="item.name"></TextTruncate>
      </li>
    </ul>
  </Dropdown>
</template>