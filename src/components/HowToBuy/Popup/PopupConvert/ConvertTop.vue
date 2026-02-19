<script setup>
import IconConvert from "@/assets/svg/IconConvert.vue";
import "./PopupConvert.css";
import Logo from "@/assets/img/logoHeader.png";
import lineBuy from "@/assets/img/lineBuy.png";
</script>

<template>
  <div class="convertTop">
    <div class="convertTopTitle">BUY $FIX</div>
    <div class="convertTopTexts">
      <div class="convertTopSubtitle">
        <span>
          <div class="convertTopSubImg"><img :src="Logo" alt="" /></div>
          1 FIX
        </span>
        =
        <span>
          <IconConvert />
          0.33709673 USD
        </span>
      </div>

      <div class="convertTopSubRight">
        <div class="convertTopSubRightTitle">20%</div>
        <div class="convertTopSubRightSubtitle deskConvTop">
          Increase On Listing
        </div>
        <div class="convertTopSubRightSubtitle mobConvTop">On Listing</div>
      </div>
    </div>

    <div class="convertTopLine">
      <img :src="lineBuy" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
