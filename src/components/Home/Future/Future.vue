<script setup>
import Stars from "@/assets/svg/Stars.vue";
import phoneText from "@/assets/img/futurePhoneText.png";
import phoneCont from "@/assets/img/futurePhoneCont.png";
import phoneBorder from "@/assets/img/futurePhoneBg.png";

import "./Future.css";

const FutureCards = [
  {
    title: "Deal Diligence Process",
    text: "Every opportunity on FundFix goes through a multi-phase vetting pipeline",
    subtitles: [
      { subtitle: "Financial/legal audit" },
      { subtitle: "Market sizing & competitive analysis" },
      { subtitle: "Technical team & roadmap review" },
      { subtitle: "KPI and traction validation" },
    ],
  },
  {
    title: "Platform Transparency",
    text: "FundFix provides tools and insights for smarter investing",
    subtitles: [
      { subtitle: "Real companies with traction" },
      { subtitle: "Performance dashboards" },
      { subtitle: "Investment memos & pitch videos" },
    ],
  },
];

import { onMounted, onBeforeUnmount, ref, defineExpose, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Tokenomics from "../Tokenomics/Tokenomics.vue";
import AnimatedText from "@/components/AnimatedText.vue";

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance = null;

onMounted(async () => {
  await nextTick();

  const cards = document.querySelectorAll(".futureCard");
  const phoneImage = document.querySelector(".futurePhone");
  const overlay = document.querySelector(".phoneOverlay");
  const futureTexts = document.querySelector(".futureTexts");
  const futureSection = document.querySelector(".future");
  const tokenomics = document.querySelector(".tokenomicsInFuture");

  if (
    !cards.length ||
    !phoneImage ||
    !overlay ||
    !futureTexts ||
    !futureSection ||
    !tokenomics
  ) {
    console.warn("Some elements not found, skipping animation");
    return;
  }

  const isMiniMobile = window.innerWidth < 641;
  const isMobile = window.innerWidth < 769;
  const isTablet = window.innerWidth < 1025;
  const bigDesktop = window.innerWidth > 1600;

  const initialWidth = phoneImage.offsetWidth;
  const targetWidth = window.innerWidth;

  const scaleFactor = bigDesktop
    ? (targetWidth / initialWidth) * 1.2
    : isMiniMobile
    ? (targetWidth / initialWidth) * 1.83
    : isMobile
    ? (targetWidth / initialWidth) * 1.1
    : (targetWidth / initialWidth) * 1.2;

  gsap.set(tokenomics, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: isMobile ? -53 : -50,
    yPercent: -50,
    opacity: 0,
    scale: isMobile ? 0.25 : isTablet ? 0.29 : 0.27,
    transformOrigin: "center center",
  });

  gsap.set(overlay, {
    scaleY: 0,
    transformOrigin: "bottom center",
    opacity: 1,
  });

  if (isMobile) {
    cards.forEach((card) => {
      gsap.set(card, {
        position: "absolute",
        bottom: 0,
        left: "50%",
        xPercent: -50,
        yPercent: 200,
        opacity: 0,
      });
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "future-sequence",
      trigger: isMobile ? futureTexts : futureSection,
      pin: futureSection,
      start: "top top",
      end: () =>
        `+=${isMobile ? cards.length * 400 + 600 : cards.length * 1000 + 800}`,
      scrub: isMobile ? 0.8 : 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      ...(isMobile && {
        normalizeScroll: false,
        fastScrollEnd: true,
        preventOverlaps: true,
      }),
      onUpdate: (self) => {
        if (isMobile && self.isActive) {
          document.body.style.touchAction = "pan-y";
        }
      },
      onToggle: (self) => {
        if (isMobile) {
          if (self.isActive) {
            document.body.style.touchAction = "pan-y";
            document.body.style.overscrollBehavior = "contain";
          } else {
            document.body.style.touchAction = "";
            document.body.style.overscrollBehavior = "";
          }
        }
      },
    },
  });

  scrollTriggerInstance = ScrollTrigger.getById("future-sequence");

  if (isMobile) {
    tl.to(overlay, {
      scaleY: 1,
      opacity: 1,
      duration: 3,
      ease: "power2.inOut",
    });

    tl.to(
      cards,
      {
        y: 1,
        opacity: 1,
        duration: 3,
        stagger: 0.2,
        ease: "power3.out",
      },
      "<+=0.1"
    );

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          yPercent: -310,
          opacity: 1,
          duration: 6,
          ease: "power3.inOut",
        },
        i === 0 ? "<-=0.3" : "<"
      );
    });

    tl.to(
      futureTexts,
      {
        y: -200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "<+=3"
    );

    tl.to(
      phoneImage,
      {
        y: -280,
        scale: scaleFactor,
        duration: 3,
        ease: "power2.inOut",
      },
      "<+=0.1"
    );

    tl.to(
      tokenomics,
      {
        opacity: 1,
        scale: isMiniMobile ? 0.5 : 0.4,
        y: isMiniMobile ? 110 : 83,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "<+=0.3"
    );
  } else {
    tl.to([futureTexts, cards], {
      yPercent: -400,
      opacity: 1,
      ease: "power2.out",
      duration: 3,
    });

    tl.to(
      phoneImage,
      {
        y: bigDesktop ? -100 : -200,
        ease: "power2.inOut",
        duration: 1,
      },
      "<+0.2"
    );

    tl.to(
      overlay,
      {
        scaleY: 1,
        opacity: 1,
        duration: 2.5,
        ease: "power2.inOut",
      },
      "<+=0.3"
    );

    tl.to(
      phoneImage,
      {
        scale: scaleFactor,
        ease: "power2.inOut",
        duration: 3.5,
      },
      "<+=0.2"
    );

    tl.to(
      tokenomics,
      {
        opacity: 1,
        scale: bigDesktop ? 0.16 : isMobile ? 0.25 : isTablet ? 0.29 : 0.22,
        y: bigDesktop ? 12 : isTablet ? 30 : 26,
        ease: "power2.inOut",
        duration: 2,
      },
      "<+=1"
    );
  }
});

onBeforeUnmount(() => {
  document.body.style.touchAction = "";
  document.body.style.overscrollBehavior = "";

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.id === "future-sequence") {
      trigger.kill();
    }
  });

  ScrollTrigger.refresh();
});

const tokenomicsRef = ref(null);

function scrollToTokenomics() {
  tokenomicsRef.value?.scrollIntoView({ behavior: "smooth" });
}

defineExpose({ scrollToTokenomics });
</script>

<template>
  <div class="future">
    <div class="futureTexts">
      <div class="UnderTitle">
        <Stars />
        <AnimatedText text="Next-Gen Investing" />
      </div>
      <AnimatedText
        class="Title futureTitle desktopFutureTitle"
        text="The Future of Private Investing"
      />
    </div>

    <div class="futurePhoneWrap">
      <div class="futurePhone">
        <div class="futurePhoneBg"></div>
        <div class="futurePhoneBorder">
          <img :src="phoneBorder" alt="" />
        </div>
        <div class="phoneContent">
          <div class="futurePhoneText">
            <img :src="phoneText" alt="" />
          </div>
          <img :src="phoneCont" alt="" />
        </div>

        <div class="phoneOverlay">
          <div class="tokenomicsWrapper" ref="tokenomicsRef">
            <Tokenomics class="tokenomicsInFuture" />
          </div>
        </div>

        <div
          class="futureCard mobileFutureCard"
          v-for="(card, index) in FutureCards"
          :key="index"
          :class="{ left: index === 0, right: index === 1 }"
        >
          <div class="futureCardTexts">
            <div class="futureCardTitle">{{ card.title }}</div>
            <div class="futureCardText">{{ card.text }}</div>
          </div>
          <div class="futureCardSubtitles">
            <div
              class="futureCardSubtitle"
              v-for="(sub, i) in card.subtitles"
              :key="i"
              :class="{
                firstSubFut: index === 0 && i === 0,
                secSubFut: index === 0 && i === 1,
                thirdSubFut: index === 0 && i === 2,
                fourthSubFut: index === 0 && i === 3,
                firstSubSecCardFut: index === 1 && i === 0,
                secSubSecCardFut: index === 1 && i === 1,
                thirdSubSecCardFut: index === 1 && i === 2,
              }"
            >
              {{ sub.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="futureCard desktopFutureCard"
      v-for="(card, index) in FutureCards"
      :key="index"
      :class="{ left: index === 0, right: index === 1 }"
    >
      <div class="futureCardTexts">
        <div class="futureCardTitle">{{ card.title }}</div>
        <div class="futureCardText">{{ card.text }}</div>
      </div>
      <div class="futureCardSubtitles">
        <div
          class="futureCardSubtitle"
          v-for="(sub, i) in card.subtitles"
          :key="i"
          :class="{
            firstSubFut: index === 0 && i === 0,
            secSubFut: index === 0 && i === 1,
            thirdSubFut: index === 0 && i === 2,
            fourthSubFut: index === 0 && i === 3,
            firstSubSecCardFut: index === 1 && i === 0,
            secSubSecCardFut: index === 1 && i === 1,
            thirdSubSecCardFut: index === 1 && i === 2,
          }"
        >
          {{ sub.subtitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
