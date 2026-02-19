<script setup>
import "./Popup.css";
import PopupConvert from "./PopupConvert/PopupConvert.vue";
import PopupTimer from "./PopupTImer/PopupTimer.vue";
</script>

<template>
  <div class="popupWrapper">
    <div class="popup">
      <PopupTimer />
      <PopupConvert />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
