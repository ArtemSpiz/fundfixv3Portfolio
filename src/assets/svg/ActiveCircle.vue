<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <circle cx="9" cy="9" r="9" :fill="fill" />
    <circle cx="9" cy="9" r="5" fill="#272727" />
    <defs>
      <linearGradient
        id="paint0_linear_1056_4529"
        x1="9"
        y1="0"
        x2="9"
        y2="18"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#EBC0BF" />
        <stop offset="1" stop-color="#94A0E8" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  fill: {
    type: String,
    default: "url(#paint0_linear_1056_4529)",
  },
});
</script>

<style lang="scss" scoped></style>
