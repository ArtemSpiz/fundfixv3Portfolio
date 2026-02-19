<script setup>
import Stars from "@/assets/svg/Stars.vue";
import "./HowToBuySection.css";

import HowBuyCardImage1 from "@/assets/img/HowBuyCardImage1.png";
import HowBuyCardImage2 from "@/assets/img/HowBuyCardImage2.png";
import HowBuyCardImage3 from "@/assets/img/HowBuyCardImage3.png";
import HowBuyCardImage4 from "@/assets/img/HowBuyCardImage4.png";
import AnimatedText from "@/components/AnimatedText.vue";
import { ref, reactive, nextTick } from "vue";
const isNotMobile = window.innerWidth >= 769;

const HowBuyCards = [
  {
    image: HowBuyCardImage1,
    title: "Setup Wallet",
    subtitle: "Connect via Wallet Connect if needed",
    number: "01",
  },
  {
    image: HowBuyCardImage2,
    title: "Choose Currency",
    subtitle: "Supported: ETH, BNB, MATIC, USDT, BUSD, USDC",
    number: "02",
  },
  {
    image: HowBuyCardImage3,
    title: "Buy FIX",
    subtitle: "Enter the amount, confirm in your wallet, pay gas fee",
    number: "03",
  },
  {
    image: HowBuyCardImage4,
    title: "Receive Tokens",
    subtitle:
      "Tokens will be airdropped after presale. Track assets in your wallet",
    number: "04",
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
  if (isNotMobile) {
    return;
  }
  const total = HowBuyCards.length;
  const relativeIndex = (index - activeIndex.value + total) % total;

  const blur = relativeIndex * 2;

  const z = 100 - relativeIndex;
  const baseTranslateXPercent = 50;
  const translateYPercent = 0;
  const rotate = 0 - relativeIndex * 4;
  const extraShiftPx = 0;
  const extraShiftPy = relativeIndex * -12;
  const darkOverlay = relativeIndex * 0.2;
  const brightness = 1 - darkOverlay;
  const width = `calc(343px - (${relativeIndex}px * 20))`;

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
  if (isNotMobile) {
    return;
  }
  if (dragState.animationInProgress) return;

  dragState.dragging = true;
  dragState.startX = event.clientX || event.touches?.[0]?.clientX || 0;
  dragState.currentX = dragState.startX;

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}

function onPointerMove(event) {
  if (isNotMobile) {
    return;
  }
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
  if (isNotMobile) {
    return;
  }
  if (!dragState.dragging) return;

  const threshold = 50;
  const direction = dragState.translateX > 0 ? 1 : -1;

  if (Math.abs(dragState.translateX) > threshold) {
    dragState.animationInProgress = true;

    dragState.translateX = direction * window.innerWidth * 0.1;
    dragState.rotate = direction * 10;

    setTimeout(() => {
      activeIndex.value =
        (activeIndex.value + direction + HowBuyCards.length) %
        HowBuyCards.length;

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
  <div class="howBuy">
    <div class="howBuyTexts">
      <div class="howBuyTitles">
        <div class="UnderTitle"><Stars /> How it works</div>
        <AnimatedText class="howBuyTitle" text="How to buy" />
      </div>

      <AnimatedText
        class="howBuySubtitle Subtitle"
        anim-delay="0.01"
        text="  Easily purchase TICS in just a few steps. Connect your wallet, choose your currency, and follow the guided process — simple, secure, and fast"
      />
    </div>

    <div class="howBuyCardsWrapper">
      <div class="howBuyCards">
        <div
          class="howBuyCardWrapper"
          v-for="(card, index) in HowBuyCards"
          :key="index"
          :class="{
            sec: index === 1,
            third: index === 2,
            fourth: index === 3,
          }"
          :ref="index === 0 ? (el) => (activeCard = el) : null"
          @pointerdown="onPointerDown"
          :style="getCardStyle(index)"
        >
          <div class="howBuyCard">
            <div class="howBuyCardTop">
              <div class="howBuyCardImg">
                <img :src="card.image" alt=" " />
              </div>
              <div class="howBuyCardText">
                <div class="howBuyCardTitle">{{ card.title }}</div>
                <div class="howBuyCardSubtitle">{{ card.subtitle }}</div>
              </div>
            </div>

            <div class="howBuyCardNum">{{ card.number }}</div>
          </div>
        </div>

        <div class="howBuyCardsPags">
          <div
            v-for="(card, index) in HowBuyCards"
            :key="card.id"
            class="howBuyCardsPag"
            :class="{ active: index === activeIndex }"
            @click="goToCard(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
