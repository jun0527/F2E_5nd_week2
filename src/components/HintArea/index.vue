<script setup>
import SvgIcon from "../Common/SvgIcon.vue";

defineOptions({
  name: "HintArea"
});
const hintData = [
  {
    id: 0,
    content: "點擊選擇縣市、區、村里，可查看選舉結果",
    img: new URL("@/assets/image/selectHint.svg", import.meta.url).href
  },
  {
    id: 1,
    content: "點擊地圖查看縣市的選舉結果",
    img: new URL("@/assets/image/mapHint.svg", import.meta.url).href
  }
];
</script>
<template>
  <ul
    :class="[
      'flex justify-start sm:justify-center lg:block',
      'w-full overflow-x-auto'
    ]"
  >
    <li
      v-for="hint in hintData"
      :key="hint.id"
      :class="[
        'w-[260px] h-[249px] bg-darkBlue_light_hover',
        'flex flex-col justify-between flex-none',
        'rounded-[8px]',
        'p-[20px] mr-[20px] last:mr-0 lg:mb-[20px] lg:last:mb-0 lg:mr-0'
      ]"
    >
      <div>
        <p :class="['flex items-center', 'mb-[8px]']">
          <SvgIcon
            name="info"
            :class="['w-[24px] h-[24px]', 'mr-[8px]']"
          ></SvgIcon>
          <span :class="['h6 font-semibold']">小提示</span>
        </p>
        <p :class="['t-rg']">{{ hint.content }}</p>
      </div>
      <div :class="['w-full h-[103px]', 'flex justify-center items-center']">
        <img :src="hint.img" />
      </div>
    </li>
  </ul>
</template>