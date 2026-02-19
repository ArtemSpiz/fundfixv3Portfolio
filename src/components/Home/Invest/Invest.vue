<script setup>
import ArrowBtn from "@/assets/svg/ArrowBtn.vue";
import Stars from "@/assets/svg/Stars.vue";

import "./Invest.css";

import InvestCardsBg1 from "@/assets/img/InvestCardsBg1.png";
import InvestCardsBg2 from "@/assets/img/InvestCardsBg2.png";
import InvestCardsBg3 from "@/assets/img/InvestCardsBg3.png";
import InvestCardsBg4 from "@/assets/img/InvestCardsBg4.png";

import InvestCardsImg1 from "@/assets/img/InvestCardsImg1.png";
import InvestCardsImg2 from "@/assets/img/InvestCardsImg2.png";
import InvestCardsImg3 from "@/assets/img/InvestCardsImg3.png";
import InvestCardsImg4 from "@/assets/img/InvestCardsImg4.png";
import InvestCardsImg2Mob from "@/assets/img/InvestCardsImg2Mob.png";

import { ref, reactive, nextTick } from "vue";
const isMobile = window.innerWidth <= 640;
const isMiniDesk = window.innerWidth <= 1285;
const isTablet = window.innerWidth <= 1024;

const InvestCards = [
  {
    id: 1,
    bgImage: InvestCardsBg1,
    image: InvestCardsImg1,
    title: "Browse Curated Opportunities",
    subtitle: "Pre-vetted, institution-backed startups and assets",
    number: "1",
  },
  {
    id: 2,
    bgImage: InvestCardsBg2,
    image: isMiniDesk ? InvestCardsImg2Mob : InvestCardsImg2,
    title: "Browse Curated Opportunities",
    subtitle: "Pre-vetted, institution-backed startups and assets",
    number: "2",
  },
  {
    id: 3,
    bgImage: InvestCardsBg3,
    image: InvestCardsImg3,
    title: "Browse Curated Opportunities",
    subtitle: "Pre-vetted, institution-backed startups and assets",
    number: "3",
  },
  {
    id: 4,
    bgImage: InvestCardsBg4,
    image: InvestCardsImg4,
    title: "Track, Earn, Influence",
    subtitle:
      "Monitor performance, receive profit share from exits, and vote on platform strategy",
    number: "4",
  },
];

const activeIndex = ref(0);

const dragState = reactive({
  dragging: false,
  startX: 0,
  currentX: 0,
  translateX: 0,
  rotate: 0,
  animationInProgress: false,
});

function getCardStyle(index) {
  const total = InvestCards.length;
  const relativeIndex = (index - activeIndex.value + total) % total;

  const blur = relativeIndex * 2;

  const z = 100 - relativeIndex;
  const baseTranslateXPercent = 50;
  const translateYPercent = isMobile ? 40 : isTablet ? 30 : 20;
  const rotate = isMobile ? 0 - relativeIndex * 4 : 0 - relativeIndex * 5;
  const extraShiftPx = isTablet
    ? 0
    : isMiniDesk
    ? relativeIndex * 80
    : relativeIndex * 100;
  const extraShiftPy = isTablet ? relativeIndex * -20 : 0;
  const darkOverlay = relativeIndex * 0.2;
  const brightness = 1 - darkOverlay;
  const width = isMobile
    ? `calc(343px - (${relativeIndex}px * 30))`
    : isTablet
    ? `calc(390px - (${relativeIndex}px * 20))`
    : "max-content";

  if (relativeIndex === 0) {
    return {
      position: "absolute",
      top: "0%",
      right: "50%",
      transform: `translate(${baseTranslateXPercent}%, ${translateYPercent}%) translateX(${
        dragState.translateX
      }px) rotate(${dragState.rotate + rotate}deg)`,
      filter: `blur(${blur}px) brightness(${brightness})`,
      zIndex: z,
      cursor: dragState.dragging ? "grabbing" : "grab",
      transition: dragState.animationInProgress
        ? "transform 0.4s ease, filter 0.3s ease , width 0.4s ease-in-out"
        : dragState.dragging
        ? "none"
        : "transform 0.4s ease, filter 0.3s ease  , width 0.4s ease-in-out",
    };
  }

  return {
    position: "absolute",
    top: "0%",
    right: "50%",
    width: width,
    zIndex: z,
    transform: `translate(
      calc(${baseTranslateXPercent}% + ${extraShiftPx}px),
      calc(${translateYPercent}% + ${extraShiftPy}px)
    )`,
    filter: `blur(${blur}px) brightness(${brightness})`,
    transition: "all 0.3s ease",
  };
}

function onPointerDown(event) {
  if (dragState.animationInProgress) return;

  dragState.dragging = true;
  dragState.startX = event.clientX || event.touches?.[0]?.clientX || 0;
  dragState.currentX = dragState.startX;

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}

function onPointerMove(event) {
  if (!dragState.dragging) return;

  dragState.currentX = event.clientX || event.touches?.[0]?.clientX || 0;
  dragState.translateX = dragState.currentX - dragState.startX;

  const maxTranslate = window.innerWidth * 0.2;

  if (Math.abs(dragState.translateX) >= maxTranslate) {
    onPointerUp();
    return;
  }

  dragState.translateX = Math.max(
    -maxTranslate,
    Math.min(maxTranslate, dragState.translateX)
  );

  dragState.rotate = (dragState.translateX / window.innerWidth) * 20;
}

function onPointerUp() {
  if (!dragState.dragging) return;

  const threshold = 50;
  const direction = dragState.translateX > 0 ? 1 : -1;

  if (Math.abs(dragState.translateX) > threshold) {
    dragState.animationInProgress = true;

    dragState.translateX = direction * window.innerWidth * 0.1;
    dragState.rotate = direction * 10;

    setTimeout(() => {
      activeIndex.value =
        (activeIndex.value + direction + InvestCards.length) %
        InvestCards.length;

      nextTick(() => {
        dragState.translateX = 0;
        dragState.rotate = 0;
        dragState.animationInProgress = false;
      });
    }, 200);
  } else {
    dragState.translateX = 0;
    dragState.rotate = 0;
  }

  dragState.dragging = false;

  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerUp);
}

function goToCard(index) {
  if (dragState.animationInProgress || index === activeIndex.value) return;

  dragState.animationInProgress = true;
  dragState.translateX =
    (index > activeIndex.value ? 1 : -1) * window.innerWidth * 0.1;
  dragState.rotate = (index > activeIndex.value ? 1 : -1) * 10;

  setTimeout(() => {
    activeIndex.value = index;
    nextTick(() => {
      dragState.translateX = 0;
      dragState.rotate = 0;
      dragState.animationInProgress = false;
    });
  }, 200);
}
</script>

<template>
  <div class="invest">
    <div class="investTexts">
      <div class="investTitles">
        <div class="UnderTitle"><Stars /> Invest in four steps</div>
        <div class="investTitle">How it Works</div>
      </div>

      <button class="investBtn jelly-wave">Join to FundFix <ArrowBtn /></button>
    </div>

    <div class="investCardsWrapper">
      <div class="investCards">
        <div
          class="investCardWrapper"
          v-for="(card, index) in InvestCards"
          :key="`desktop-${card.id}`"
          :class="{
            activeCard: index === 0,
            sec: index === 1,
            third: index === 2,
            fourth: index === 3,
          }"
          :ref="index === 0 ? (el) => (activeCard = el) : null"
          @pointerdown="onPointerDown"
          :style="getCardStyle(index)"
          і
        >
          <div class="investCard">
            <div
              class="investCardContent"
              :style="{ backgroundImage: `url(${card.bgImage})` }"
            >
              <div
                class="investCardImg"
                :class="{
                  sec: index === 1,
                  third: index === 2,
                  fourth: index === 3,
                }"
              >
                <img :src="card.image" />
              </div>

              <div class="investCardTitles investCardTitlesDesktop">
                <div class="investCardTitle">{{ card.title }}</div>
                <div class="investCardSubtitle">{{ card.subtitle }}</div>
              </div>
            </div>

            <div class="investCardNum">{{ card.number }}</div>

            <div class="investCardTitlesMobile">
              <div class="investCardTitle">{{ card.title }}</div>
              <div class="investCardSubtitle">{{ card.subtitle }}</div>
            </div>
          </div>
        </div>

        <div class="investCardsPags">
          <div
            v-for="(card, index) in InvestCards"
            :key="card.id"
            class="investCardsPag"
            :class="{ active: index === activeIndex }"
            @click="goToCard(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
