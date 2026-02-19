<script setup>
import CompMouse from "@/assets/svg/CompMouse.vue";
import "./Hero.css";
import ArrowBtn from "@/assets/svg/ArrowBtn.vue";

import heroCard1 from "@/assets/img/heroCard1.png";
import heroCard2 from "@/assets/img/heroCard2.png";
import heroCard3 from "@/assets/img/heroCard3.png";
import heroCard4 from "@/assets/img/heroCard4.png";
import heroCard5 from "@/assets/img/heroCard5.png";
import heroCard6 from "@/assets/img/heroCard6.png";
import heroCard7 from "@/assets/img/heroCard7.png";

import heroCardIcon from "@/assets/img/heroCardActive.png";
import { onMounted, onUnmounted, ref, watch } from "vue";
import AnimatedText from "@/components/AnimatedText.vue";

import Shadow from "@/assets/svg/Shadow.vue";

const HeroCards = [
  {
    image: heroCard1,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard2,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard3,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard4,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard5,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard6,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard7,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard1,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard2,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard3,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard4,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard5,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard6,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
  {
    image: heroCard7,
    icon: heroCardIcon,
    name: "Changpeng Zhao",
    position: "Binance founder",
  },
];

const heroRef = ref(null);
const isVisible = ref(false);
const isBtnLoaded = ref(false);
const btnRef = ref(null);
const isMobile = window.innerWidth < 641;

const cardsWithPositions = ref([]);
const activeIndex = ref(0);

let intervalId = null;

const hasLoaded = ref(false);

function updatePositions() {
  const screenWidth = window.innerWidth;
  let radius;

  if (screenWidth >= 1600) {
    radius = 750;
  } else if (screenWidth >= 1285) {
    radius = 610;
  } else if (screenWidth >= 1024) {
    radius = 620;
  } else if (screenWidth >= 768) {
    radius = 570;
  } else {
    radius = 550;
  }
  const centerX = screenWidth / 2;

  let centerY;

  if (screenWidth >= 1600) {
    centerY = 1050;
  } else if (screenWidth <= 640) {
    centerY = 750;
  } else {
    centerY = 800;
  }

  const total = HeroCards.length;
  const visibleCount = screenWidth < 640 ? 5 : 7;
  const centerIndex = Math.floor(visibleCount / 2);
  const maxRotationDeg = screenWidth > 1600 ? 65 : screenWidth < 640 ? 50 : 80;

  const visibleCards = [];

  for (let i = 0; i < visibleCount; i++) {
    const realIndex = (activeIndex.value - centerIndex + i + total) % total;
    const offsetFromCenter = i - centerIndex;

    const totalAngle =
      screenWidth > 1600
        ? Math.PI / 1.1
        : screenWidth < 640
        ? Math.PI / 2
        : Math.PI / 1.15;
    const angleStep = totalAngle / (visibleCount - 1);
    const startAngle = Math.PI / 2 - totalAngle / 2;

    const angle = startAngle + angleStep * i;

    const x =
      screenWidth > 1600
        ? centerX + radius * Math.cos(angle) * 1.3
        : centerX + radius * Math.cos(angle) * 1.15;
    const y = centerY - radius * Math.sin(angle);

    const rotateDeg = (-maxRotationDeg * offsetFromCenter) / centerIndex;
    const isActive = offsetFromCenter === 0;

    visibleCards.push({
      ...HeroCards[realIndex],
      originalIndex: realIndex,
      isActive,
      rotateDeg,
      delay: Math.max(50, Math.abs(offsetFromCenter) * 60),
      visible: false,
      loaded: false,
      style: {
        left: `${x}px`,
        top: `${y}px`,
        position: "absolute",
        zIndex: isActive ? 10 : 1,
      },
    });
  }

  if (!hasLoaded.value) {
    cardsWithPositions.value = visibleCards.map((card) => ({
      ...card,
      visible: true,
      loaded: false,
    }));

    setTimeout(() => {
      cardsWithPositions.value = cardsWithPositions.value.map((card) => ({
        ...card,
        loaded: true,
      }));
      hasLoaded.value = true;
    }, 100);
  } else {
    cardsWithPositions.value = visibleCards.map((card) => ({
      ...card,
      visible: true,
      loaded: true,
    }));
  }

  setTimeout(() => {
    isBtnLoaded.value = true;
  }, 500);
}

onMounted(() => {
  intervalId = setInterval(
    () => {
      activeIndex.value = (activeIndex.value - 1) % HeroCards.length;
    },
    isMobile ? 2500 : 5000
  );

  updatePositions();
});

onUnmounted(() => {
  clearInterval(intervalId);
});

watch(activeIndex, (newVal) => {
  updatePositions();

  cardsWithPositions.value = cardsWithPositions.value.map((card) => {
    if (card.originalIndex === (newVal + HeroCards.length) % HeroCards.length) {
      return { ...card, shouldSpin: true };
    }
    return { ...card, shouldSpin: false };
  });
});

let observer = null;

function startAutoScroll() {
  if (!intervalId) {
    intervalId = setInterval(
      () => {
        activeIndex.value = (activeIndex.value - 1) % HeroCards.length;
      },
      isMobile ? 2500 : 5000
    );
  }
}

function stopAutoScroll() {
  clearInterval(intervalId);
  intervalId = null;
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoScroll();
  } else if (isVisible.value) {
    startAutoScroll();
  }
}

onMounted(() => {
  updatePositions();

  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;

      if (document.hidden) return;

      if (entry.isIntersecting) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    },
    {
      threshold: 0.5,
    }
  );

  if (heroRef.value) {
    observer.observe(heroRef.value);
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  stopAutoScroll();

  if (observer && heroRef.value) {
    observer.unobserve(heroRef.value);
  }

  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <div id="home" class="hero" ref="heroRef">
    <Shadow class="heroShadow" />
    <div class="heroTexts">
      <div class="heroTitleWrap">
        <AnimatedText class="heroTitle" text="Web3's" />
        <AnimatedText class="heroTitle" text="Wall Street" />
      </div>

      <AnimatedText
        class="heroSubtitle"
        anim-delay="0.01"
        text="Your own hedge fund in a Token that open up access to early investments."
      />

      <button
        ref="btnRef"
        :class="{ loaded: isBtnLoaded }"
        class="heroBtn jelly-wave"
      >
        Join to FundFix <ArrowBtn />
      </button>
    </div>
    <div class="heroBottom"><CompMouse /> Scoll to Discover</div>

    <div class="heroCards">
      <div
        class="heroCard"
        :class="{
          active: card.isActive,
          loaded: card.loaded,
          spin: card.shouldSpin,
        }"
        v-for="card in cardsWithPositions"
        :key="card.originalIndex"
        v-show="card.visible"
        :style="{
          left: card.style.left,
          top: card.style.top,
          zIndex: card.style.zIndex,
          position: 'absolute',
          transitionDelay: card.loaded ? `${card.delay}ms` : '0ms',
          transform: `
    translate(-50%, -50%)
    translateY(${card.loaded ? '0px' : '200px'})
    rotate(${card.rotateDeg}deg)
    ${card.shouldSpin ? 'rotateY(360deg)' : ''}
  `,
        }"
      >
        <div
          class="heroCardInner"
          :style="{ transform: `rotate(${-card.rotateDeg}deg)` }"
        >
          <div
            class="heroCardImg"
            :style="{ transform: `rotate(${card.rotateDeg}deg)` }"
          >
            <img :src="card.image" alt="" />
          </div>

          <div
            class="heroCardContent"
            :class="{ active: card.isActive }"
            :style="{ transform: `rotate(${card.rotateDeg}deg)` }"
          >
            <div class="heroCardContIcon">
              <img :src="card.icon" alt="" />
            </div>
            <div class="heroCardTexts">
              <div class="heroCardContTitle">{{ card.name }}</div>
              <div class="heroCardContSubtitle">{{ card.position }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
