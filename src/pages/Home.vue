<script setup>
import "../style.css";
import HeaderLayout from "../layout/Header/HeaderLayout.vue";
import Hero from "../components/Home/Hero/Hero.vue";
import Accessibility from "../components/Home/Accessibility/Accessibility.vue";
import Scale from "../components/Home/Scale/Scale.vue";
import Future from "../components/Home/Future/Future.vue";
import Roadmap from "../components/Home/Roadmap/Roadmap.vue";
import FIX from "../components/Home/FIX/FIX.vue";
import FAQ from "../components/Home/FAQ/FAQ.vue";
import Institutions from "../components/Home/Institutions/Institutions.vue";
import { ref, computed, onMounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Invest from "@/components/Home/Invest/Invest.vue";

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 641;
const bigDesktop = window.innerWidth > 1600;
const isOnRoadmapScroll = ref(false);
const isOnTokenomics = ref(false);

const isHeaderDark = computed(
  () => isOnRoadmapScroll.value || isOnTokenomics.value
);

onMounted(async () => {
  await nextTick();

  setTimeout(() => {
    ScrollTrigger.create({
      trigger: "#roadmap",
      start: "top 80%",
      end: "bottom 50%",
      onEnter: () => {
        console.log("Roadmap entered");
        isOnRoadmapScroll.value = true;
      },
      onEnterBack: () => {
        console.log("Roadmap entered back");
        isOnRoadmapScroll.value = true;
      },
      onLeave: () => {
        console.log("Roadmap left");
        isOnRoadmapScroll.value = false;
      },
      onLeaveBack: () => {
        console.log("Roadmap left back");
        isOnRoadmapScroll.value = false;
      },
    });

    const tokenomicsEl = document.querySelector("#tokenomics");
    if (tokenomicsEl) {
      let tokenomicsTimeout = null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const delay = bigDesktop ? 1000 : isMobile ? 800 : 800;

            tokenomicsTimeout = setTimeout(() => {
              console.log("Tokenomics state set to true with delay:", delay);
              isOnTokenomics.value = true;
            }, delay);
          } else {
            if (tokenomicsTimeout) {
              clearTimeout(tokenomicsTimeout);
              tokenomicsTimeout = null;
            }

            console.log("Tokenomics state set to false immediately");
            isOnTokenomics.value = false;
          }
        },
        {
          threshold: isMobile ? 0.3 : 0.1,
          rootMargin: isMobile ? "-10% 0px -10% 0px" : "0px",
        }
      );

      observer.observe(tokenomicsEl);
    }
  }, 100);
});
</script>

<template>
  <HeaderLayout
    :onScrollToTokenomics="handleScrollToTokenomics"
    :isOnRoadmap="isHeaderDark"
  />
  <Hero />
  <Accessibility />
  <FIX />
  <Invest />
  <Scale />
  <Future />
  <Roadmap />
  <FAQ />
  <Institutions />
</template>

<style scoped></style>
