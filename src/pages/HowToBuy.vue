<script setup>
import "../style.css";
import HeaderLayout from "../layout/Header/HeaderLayout.vue";
import Popup from "@/components/HowToBuy/Popup/Popup.vue";
import HowToBuySection from "@/components/HowToBuy/HowToBuySection/HowToBuySection.vue";
import Footer from "@/layout/Footer/Footer.vue";
import PointBuy from "@/components/HowToBuy/PointBuy/PointBuy.vue";
</script>

<template>
  <div class="howToBuyPage">
    <HeaderLayout />
    <Popup />
    <HowToBuySection />
    <PointBuy />
    <Footer />
  </div>
</template>

<style scoped></style>
