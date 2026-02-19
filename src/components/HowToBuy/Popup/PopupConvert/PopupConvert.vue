<script setup>
import "./PopupConvert.css";
import ConvertTop from "./ConvertTop.vue";
import ConvertCenter from "./ConvertCenter.vue";
</script>

<template>
  <div class="convert">
    <ConvertTop />
    <ConvertCenter />

    <div class="popupBtns">
      <button class="popupBtnColor jelly-wavePopup">Connect Wallet</button>
      <button class="popupBtnTransparent">How to buy?</button>
    </div>
  </div>
</template>

<style scoped></style>
