<script setup>
import { onMounted, ref, watch } from "vue";
import "./TokenomicsPercents.css";

const TokenomicsPercents = [
  { percent: "35%", title: "Presale", color: "#89C55B", number: "10.000.000" },
  {
    percent: "20%",
    title: "Liquidity Pool",
    color: "#A883FD",
    number: "1.000.000",
  },
  { percent: "15%", title: "Marketing", color: "#E94043", number: "100.000" },
  {
    percent: "15%",
    title: "Team & Advisors",
    color: "#F1A63C",
    number: "100.000",
  },
  {
    percent: "15%",
    title: "Development Fund",
    color: "#F48665",
    number: "100.000",
  },
];

const activeIndex = ref(-1);
const displayNumber = ref(0);

function parseNumber(str) {
  return Number(str.replace(/\./g, ""));
}

const total = TokenomicsPercents.reduce(
  (acc, cur) => acc + parseNumber(cur.number),
  0
);

onMounted(() => {
  displayNumber.value = total;
});

const isMobile = window.innerWidth < 769;
const isMiniMobile = window.innerWidth < 640;

watch(activeIndex, (newIndex) => {
  let target = 0;
  if (newIndex !== -1) {
    target = parseNumber(TokenomicsPercents[newIndex].number);
  } else {
    target = total;
  }

  const duration = 1000;
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;
  const startValue = displayNumber.value;
  const diff = target - startValue;

  function animate() {
    frame++;
    const progress = frame / totalFrames;
    if (progress < 1) {
      displayNumber.value = Math.floor(startValue + diff * progress);
      requestAnimationFrame(animate);
    } else {
      displayNumber.value = target;
    }
  }
  animate();
});

const baseRadius = 120;
const arcSpacing = 16;

const svgWidth = 400;
const svgHeight = 180;

const centerX = svgWidth / 2;
const centerY = svgHeight / 1.1;
</script>

<template>
  <div class="tokenomicsPercWrap">
    <div class="tokenomicsPercents">
      <div
        class="tokenomicsPercent"
        v-for="(percent, index) in TokenomicsPercents"
        :key="index"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      >
        <div
          class="tokenomicsPercentCircle"
          :style="{ backgroundColor: percent.color }"
        />
        <div class="tokenomicsPercentTexts">
          <div class="tokenomicsPercentSubtitle">{{ percent.percent }}</div>
          <div class="tokenomicsPercentTitle">{{ percent.title }}</div>
        </div>
      </div>
    </div>

    <div class="tokenomicsArksWrap">
      <div class="tokenomicsArksText">
        <div class="tokenomicsArksTitle">Total</div>
        <transition name="fade" mode="out-in">
          <div class="tokenomicsArksSubtitle active" :key="activeIndex">
            {{ displayNumber.toLocaleString("en-US") }}
          </div>
        </transition>
      </div>

      <svg
        :width="isMiniMobile ? 343 : isMobile ? 500 : 1000"
        :height="isMiniMobile ? 200 : isMobile ? 300 : 800"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      >
        <g v-for="(percent, index) in TokenomicsPercents" :key="index">
          <defs>
            <path
              :id="'arc' + index"
              :d="`
            M ${
              centerX -
              (baseRadius +
                (TokenomicsPercents.length - 1 - index) * arcSpacing)
            },${centerY}
            A ${
              baseRadius + (TokenomicsPercents.length - 1 - index) * arcSpacing
            },${
                baseRadius +
                (TokenomicsPercents.length - 1 - index) * arcSpacing
              } 0 0,1
            ${
              centerX +
              (baseRadius +
                (TokenomicsPercents.length - 1 - index) * arcSpacing)
            },${centerY}
          `"
              fill="none"
            />
          </defs>

          <use
            stroke-linecap="round"
            :href="'#arc' + index"
            stroke="#E5E5E5"
            stroke-width="8"
          />

          <use
            stroke-linecap="round"
            :href="'#arc' + index"
            :stroke="percent.color"
            stroke-width="8"
            stroke-dasharray="840"
            :style="{
              transition: 'stroke-dashoffset 0.6s ease',
              strokeDashoffset:
                activeIndex === -1
                  ? 840 - (parseFloat(percent.percent) / 100) * 840
                  : activeIndex === index
                  ? 840 - (parseFloat(percent.percent) / 100) * 840
                  : 840,
            }"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped></style>
