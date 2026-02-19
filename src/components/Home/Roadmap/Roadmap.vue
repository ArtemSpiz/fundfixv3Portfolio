<script setup>
import Arrow from "@/assets/svg/Arrow.vue";
import Stars from "@/assets/svg/Stars.vue";
import "./Roadmap.css";

const RoadmapCards = [
  {
    title: "Q1 2025",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q2 2025",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows 2",
  },
  {
    title: "Q3 2025",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows 3",
  },
  {
    title: "Q4 2025",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows 4",
  },
  {
    title: "Q1 2026",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q2 2026",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q3 2026",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q4 2026",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q1 2027",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
  {
    title: "Q2 2027",
    subtitle:
      "Team formation, regulatory onboarding, private investor roadshows",
  },
];

import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import AnimatedText from "@/components/AnimatedText.vue";

const activeIndex = ref(0);
const pathLength = ref(0);
const scrollWrapper = ref(null);

const isMobile = ref(window.innerWidth < 769);

const isTablet = window.innerWidth < 1024;

const prev = () => {
  if (activeIndex.value > 0) activeIndex.value--;
};

const next = () => {
  if (activeIndex.value < RoadmapCards.length - 1) activeIndex.value++;
};

onMounted(() => {
  const path = document.querySelector(".roadmapSVG path");
  if (path) {
    pathLength.value = path.getTotalLength();
  }
});

const activeStrokeStyle = computed(() => {
  const total = RoadmapCards.length;
  const segment = pathLength.value / (total - 1);

  let visibleLength;

  visibleLength =
    activeIndex.value === 0
      ? 70
      : activeIndex.value === 9
      ? segment * activeIndex.value - 70
      : segment * activeIndex.value;

  return {
    strokeDasharray: pathLength.value,
    strokeDashoffset: pathLength.value - visibleLength,
    transition: "stroke-dashoffset 0.6s ease-in-out",
  };
});

const mobileProgressWidth = computed(() => {
  if (!isMobile.value || !scrollWrapper.value) return 0;

  const pointEls = scrollWrapper.value.querySelectorAll(".roadmapPoint");
  if (pointEls.length === 0) return 0;

  const activePoint = pointEls[activeIndex.value];
  if (!activePoint) return 0;

  const wrapperRect = scrollWrapper.value.getBoundingClientRect();
  const pointRect = activePoint.getBoundingClientRect();

  const pointCenterX = pointRect.left + pointRect.width / 2 - wrapperRect.left;
  const wrapperWidth = wrapperRect.width;

  const progressPercent = (pointCenterX / wrapperWidth) * 100 + 2;

  return Math.max(0, Math.min(progressPercent, 100));
});

const getPointPosition = (index, total) => {
  const radius = isTablet ? 380 : 450;
  const centerX = isTablet ? 400 : 500;
  const centerY = isTablet ? 400 : 450;

  const angle = Math.PI * (1 - index / (total - 1));
  let x = centerX + radius * Math.cos(angle);
  let y = centerY - radius * Math.sin(angle);

  if (index === 0 || index === total - 1) {
    y -= isTablet ? 70 : 50;
  }

  if (index === 0) {
    x += isTablet ? 30 : 0;
  }

  if (index === total - 1) {
    x -= isTablet ? 30 : 0;
  }

  if (index === 1) {
    x += isTablet ? 20 : 0;
  }

  if (index === total - 2) {
    x -= isTablet ? 20 : 0;
  }

  if (index === 1 || (index === total - 2 && isTablet)) {
    y -= 20;
  }

  return `position: absolute; left: ${x}px; top: ${y}px; transform: translate(-50%, -50%)`;
};

const getLineStyle = (index, total) => {
  if (isMobile.value && scrollWrapper.value) {
    const pointEls = scrollWrapper.value.querySelectorAll(".roadmapPoint");
    const point = pointEls[index];
    if (!point) return "";

    const rect = point.getBoundingClientRect();
    const wrapperRect = scrollWrapper.value.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2 - wrapperRect.left - 10;

    return `
      position: absolute;
      top: 18px;
      left: ${centerX}px;
      width: 20px;
      height: 2px;
      transform: rotate(-90deg) translateX(-50%);
      transform-origin: center center;
    `;
  }

  const radius = isTablet ? 340 : 387;
  const centerX = isTablet ? 400 : 500;
  const centerY = isTablet ? 400 : 450;

  const angle = Math.PI * (1 - index / (total - 1));

  const x1 = centerX + radius * Math.cos(angle);
  let y1 = centerY - radius * Math.sin(angle);

  if (index === 0 || index === total - 1) {
    y1 -= 50;
  }

  const length = 20;
  const angleDeg = (angle * 180) / Math.PI;

  return `position: absolute; left: ${x1}px; top: ${y1}px; width: ${length}px; transform-origin: left center; transform: rotate(${-angleDeg}deg);`;
};

function adjustFirstLastMobileOffset() {
  if (!scrollWrapper.value || !isMobile.value) return;

  const pointEls = scrollWrapper.value.querySelectorAll(".roadmapPoint");
  if (pointEls.length === 0) return;

  const first = pointEls[0];
  const last = pointEls[pointEls.length - 1];

  first.style.marginLeft = "24px";
  last.style.paddingRight = "24px";
}

function handleMobileClick(index) {
  activeIndex.value = index;
  scrollToCenter(index);
}

function scrollToCenter(index) {
  if (!scrollWrapper.value) return;

  const point = scrollWrapper.value.querySelectorAll(".roadmapPoint")[index];
  if (!point) return;

  const wrapperRect = scrollWrapper.value.getBoundingClientRect();
  const pointRect = point.getBoundingClientRect();

  const scrollLeft =
    scrollWrapper.value.scrollLeft +
    pointRect.left +
    pointRect.width / 2 -
    (wrapperRect.left + wrapperRect.width / 2);

  scrollWrapper.value.scrollTo({
    left: scrollLeft,
    behavior: "smooth",
  });
}

watch(activeIndex, (newIndex) => {
  if (isMobile.value) scrollToCenter(newIndex);
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 769;
};

onMounted(() => {
  const path = document.querySelector(".roadmapSVG path");
  if (path) {
    pathLength.value = path.getTotalLength();
  }

  window.addEventListener("resize", handleResize);
  handleResize();
  adjustFirstLastMobileOffset();
});

watch(isMobile, (val) => {
  if (val) adjustFirstLastMobileOffset();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Exclusivity from "../Exclusivity/Exclusivity.vue";
gsap.registerPlugin(ScrollTrigger);

const roadmapRef = ref(null);
const circleOverlay = ref(null);
let animation = null;
const exclusivityWrapper = ref(null);
const bigDesktop = window.innerWidth > 1600;

onMounted(() => {
  nextTick(() => {
    if (!roadmapRef.value || !circleOverlay.value || !exclusivityWrapper.value)
      return;

    gsap.fromTo(
      roadmapRef.value,
      { y: isMobile.value ? 20 : 10 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: roadmapRef.value,
          start: "bottom bottom",
          end: "+=500",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      circleOverlay.value,
      { scale: 0, opacity: 1 },
      {
        scale: bigDesktop ? 40 : 25,
        duration: 2,
        opacity: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          id: "roadmap-circle-animation",
          trigger: roadmapRef.value,
          start: "bottom bottom",
          end: "+=1000",
          pin: true,
          scrub: true,
        },
      }
    );

    gsap.to(exclusivityWrapper.value, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: roadmapRef.value,
        start: "bottom bottom",
        end: "+=1000",
        scrub: true,
      },
    });
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id === "roadmap-circle-animation" ||
      trigger.vars.id === "roadmap-exclusivity-animation"
    ) {
      trigger.kill();
    }
  });

  if (animation) {
    animation.scrollTrigger?.kill();
    animation.kill();
    animation = null;
  }
});
</script>

<template>
  <div class="roadmap" id="roadmap" ref="roadmapRef">
    <div class="roadmapTexts">
      <div class="roadmapTitles">
        <div class="UnderTitle">
          <Stars />
          <AnimatedText text="What's Ahead" />
        </div>
        <AnimatedText class="Title roadmapTitle" text="Our Roadmap" />
      </div>

      <AnimatedText
        anim-delay="0.02"
        class="Subtitle roadmapSubtitle"
        text="Access the Deals Behind Silicon Valley's Greatest Success Stories—At the Speed of Blockchain"
      />
    </div>

    <div class="roadmapCircleOverlay" ref="circleOverlay">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#0F0F0F" />
      </svg>
    </div>

    <div class="roadmapCards">
      <div v-if="!isMobile" class="roadmapArk">
        <svg
          class="roadmapSVG"
          width="1000"
          viewBox="0 0 1300 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 150 590 A 500 500 0 0 1 1150 590"
            stroke="#F1F1F1"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
          />

          <path
            ref="activePath"
            d="M 150 590 A 500 500 0 0 1 1150 590"
            stroke="#151515"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
            :style="activeStrokeStyle"
          />
        </svg>

        <div
          v-for="(item, index) in RoadmapCards"
          :key="index"
          class="roadmapPoint"
          :style="getPointPosition(index, RoadmapCards.length)"
          @click="activeIndex = index"
        >
          {{ item.title }}
        </div>

        <div
          v-for="(item, index) in RoadmapCards"
          :key="'line-' + index"
          class="roadmapLine"
          :style="getLineStyle(index, RoadmapCards.length)"
          @click="activeIndex = index"
          :class="{ active: activeIndex >= index }"
        />
      </div>

      <div v-else class="roadmapLineMobile">
        <div class="roadmapPointsScroll" ref="scrollWrapper">
          <div class="roadmapPointWrapper">
            <div
              v-for="(item, index) in RoadmapCards"
              :key="index"
              class="roadmapPoint"
              :class="{ active: activeIndex === index }"
              @click="handleMobileClick(index)"
            >
              {{ item.title }}
            </div>

            <div
              v-for="(item, index) in RoadmapCards"
              :key="'line-' + index"
              class="roadmapLine"
              :style="getLineStyle(index, RoadmapCards.length)"
              @click="activeIndex = index"
              :class="{ active: activeIndex >= index }"
            />
          </div>
        </div>

        <div class="roadmapMobileProgressWrapper">
          <div class="roadmapMobileProgressBg" />
          <div
            class="roadmapMobileProgressActive"
            :style="{
              width: mobileProgressWidth + '%',
              transition: 'width 0.3s ease-in-out',
            }"
          />
        </div>
      </div>

      <div class="roadmapCardsBottom">
        <div class="roadmapCardsTexts">
          <transition name="fadeRoadmap" mode="out-in">
            <div
              class="roadmapCardsTitle"
              :key="RoadmapCards[activeIndex].title"
            >
              {{ RoadmapCards[activeIndex].title }}
            </div>
          </transition>

          <transition name="fadeRoadmap" mode="out-in">
            <div
              class="roadmapCardsSubtitle"
              :key="RoadmapCards[activeIndex].subtitle"
            >
              {{ RoadmapCards[activeIndex].subtitle }}
              >
            </div>
          </transition>
        </div>

        <div class="roadmapCardsBtns">
          <div class="roadmapCardsArrow left" @click="prev"><Arrow /></div>
          <div class="roadmapCardsArrow" @click="next"><Arrow /></div>
        </div>
      </div>
    </div>
  </div>

  <div
    ref="exclusivityWrapper"
    class="exclusivityWrapper"
    style="margin-top: -100vh; opacity: 1; transform: translateY(100vh)"
  >
    <Exclusivity />
  </div>
</template>

<style scoped></style>
