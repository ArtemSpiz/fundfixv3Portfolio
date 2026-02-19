<script setup>
import "./Scale.css";

import scaleImage1 from "@/assets/img/scaleImage1.png";
import scaleImgLines1 from "@/assets/img/scaleImgLines1.png";
import scaleImage2 from "@/assets/img/scaleImage2.png";
import scaleImgLines2 from "@/assets/img/scaleImgLines2.png";
import scaleImage3 from "@/assets/img/scaleImage3.png";
import scaleImgLines3 from "@/assets/img/scaleImgLines3.png";
import scaleImage4 from "@/assets/img/scaleImage4.png";
import scaleImgLines4 from "@/assets/img/scaleImgLines4.png";
import { nextTick, reactive, ref } from "vue";
import AnimatedText from "@/components/AnimatedText.vue";

const ScaleCards = [
  {
    image: scaleImage1,
    title: "Platinum",
    subtitle: "Co-investment, LP-style access, and full fund visibility.",
    price: "100K",
    lines: scaleImgLines1,
  },
  {
    image: scaleImage2,
    title: "Gold",
    subtitle: "Early deals, founder briefings, and private investment rooms.",
    price: "50K",
    lines: scaleImgLines2,
  },
  {
    image: scaleImage3,
    title: "Silver",
    subtitle: "Top-tier allocations and deep deal analytics.",
    price: "10K",
    lines: scaleImgLines3,
  },
  {
    image: scaleImage4,
    title: "Bronze",
    subtitle: "Entry-level access to core curated deals and platform tools.",
    price: "1K",
    lines: scaleImgLines4,
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
  const total = ScaleCards.length;
  const relativeIndex = (index - activeIndex.value + total) % total;

  const blur = relativeIndex * 2;
  const isMobile = window.innerWidth < 768;
  const isBigDesktop = window.innerWidth >= 1600;

  const rotate = isMobile ? 0 - relativeIndex * 4 : 0 - relativeIndex * 10;
  const z = 100 - relativeIndex;
  const translateXPercent = isMobile ? 50 : isBigDesktop ? 35 : 45;
  const translateYPercent = isMobile ? 0 : 20;

  if (relativeIndex === 0) {
    return {
      position: "absolute",
      top: "50%",
      right: "50%",
      transform: `translate(${translateXPercent}%, ${translateYPercent}%) translateX(${
        dragState.translateX
      }px) rotate(${dragState.rotate + rotate}deg)`,

      filter: `blur(${blur}px)`,
      zIndex: z,
      cursor: dragState.dragging ? "grabbing" : "grab",
      transition: dragState.animationInProgress
        ? "transform 0.4s ease, filter 0.3s ease"
        : dragState.dragging
        ? "none"
        : "transform 0.4s ease, filter 0.3s ease",
    };
  }

  return {
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: `translate(${translateXPercent}%, ${translateYPercent}%) rotate(${rotate}deg)`,
    filter: `blur(${blur}px)`,
    zIndex: z,
    transition: "all 0.3s ease",
    opacity: 0.7,
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
        (activeIndex.value + direction + ScaleCards.length) % ScaleCards.length;

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

function getEclipseStyle(index) {
  const total = ScaleCards.length;
  const relativeIndex = (index - activeIndex.value + total) % total;

  const maxDarkness = 0.8;
  const darknessStep = 0.2;
  const alpha = Math.min(relativeIndex * darknessStep, maxDarkness);

  return {
    background: `rgba(0, 0, 0, ${alpha})`,
  };
}
</script>

<template>
  <div id="about" class="scale">
    <AnimatedText text="Scale Your Access" class="Title scaleTitle" />

    <div class="scaleCards">
      <div
        class="scaleCard"
        v-for="(card, index) in ScaleCards"
        :key="index"
        :style="getCardStyle(index)"
        :class="{
          thirdCard: index === 3,
          secCard: index === 2,
          firstCard: index === 1,
        }"
        @pointerdown="onPointerDown"
      >
        <div class="scaleCardWrapper">
          <div class="scaleCardEclipse" :style="getEclipseStyle(index)"></div>
          <div class="scaleCardImg">
            <img :src="card.image" alt="" draggable="false" />
          </div>

          <div class="scaleCardTexts">
            <div class="scaleCardTitle">{{ card.title }}</div>
            <div class="scaleCardSubtitle">{{ card.subtitle }}</div>
          </div>

          <div class="scaleCardBottom">
            <div class="scaleCardPriceWrap">
              <div class="scaleCardPrice">{{ card.price }}</div>
              <div class="scaleCardCurrency">$FIX</div>
            </div>
            <div class="scaleCardLines">
              <img :src="card.lines" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
