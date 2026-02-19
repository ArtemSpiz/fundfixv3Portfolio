<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import "./PopupTimer.css";
import ClockLine from "@/assets/svg/ClockLine.vue";

const days = ref("12");
const hours = ref("12");
const minutes = ref("12");

const nextDays = ref("12");
const nextHours = ref("12");
const nextMinutes = ref("12");

const daysFlip = ref(false);
const hoursFlip = ref(false);
const minutesFlip = ref(false);

const progress = ref(52);
const rangeInput = ref(null);

const progressPercent = computed(() => {
  return (progress.value / 100).toFixed(2) + "%";
});

function updateRangeBackground() {
  if (rangeInput.value) {
    const value = progress.value;
    const background = `linear-gradient(
      to right,
      rgba(238, 193, 190, 0.92) 0%,
      rgba(148, 160, 232, 0.92) ${value}%,
      transparent ${value}%,
      transparent 100%
    )`;
    rangeInput.value.style.background = background;
  }
}

function handleRangeChange() {
  updateRangeBackground();
}

let timerInterval;

function triggerFlip(unit) {
  if (unit === "days") daysFlip.value = true;
  if (unit === "hours") hoursFlip.value = true;
  if (unit === "minutes") minutesFlip.value = true;

  setTimeout(() => {
    if (unit === "days") daysFlip.value = false;
    if (unit === "hours") hoursFlip.value = false;
    if (unit === "minutes") minutesFlip.value = false;
  }, 800);
}

function startTimer() {
  let totalSeconds =
    parseInt(days.value) * 86400 +
    parseInt(hours.value) * 3600 +
    parseInt(minutes.value) * 60;

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const prevDays = days.value;
    const prevHours = hours.value;
    const prevMinutes = minutes.value;

    totalSeconds--;

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);

    const newDays = String(d).padStart(2, "0");
    const newHours = String(h).padStart(2, "0");
    const newMinutes = String(m).padStart(2, "0");

    if (newMinutes !== prevMinutes) {
      nextMinutes.value = newMinutes;
      triggerFlip("minutes");
    }
    if (newHours !== prevHours) {
      nextHours.value = newHours;
      triggerFlip("hours");
    }
    if (newDays !== prevDays) {
      nextDays.value = newDays;
      triggerFlip("days");
    }

    setTimeout(() => {
      days.value = newDays;
      hours.value = newHours;
      minutes.value = newMinutes;
    }, 250);
  }, 1000);
}

onMounted(() => {
  startTimer();
  nextTick(() => {
    updateRangeBackground();
  });
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<template>
  <div class="popupTop">
    <div class="popupClock">
      <div class="popupClockTitle">BUY $FIX</div>

      <div class="flip-clock">
        <div class="flipUnitWrapper">
          <div class="flip-unit" :class="{ flipping: daysFlip }">
            <div class="flip-unit-static-top">
              <div class="flip-digit">{{ days }}</div>
            </div>
            <div class="flip-unit-static-bottom">
              <div class="flip-digit">{{ nextDays }}</div>
            </div>
            <div class="flip-unit-flip-top">
              <div class="flip-digit">{{ days }}</div>
            </div>
            <div class="flip-unit-flip-bottom">
              <div class="flip-digit">{{ nextDays }}</div>
            </div>
            <ClockLine class="flip-unit-line" />
            <div class="flip-unit-shadow"></div>
          </div>
          <div class="flip-clock-title">Days</div>
        </div>

        <div class="flipUnitWrapper">
          <div class="flip-unit" :class="{ flipping: hoursFlip }">
            <div class="flip-unit-static-top">
              <div class="flip-digit">{{ hours }}</div>
            </div>
            <div class="flip-unit-static-bottom">
              <div class="flip-digit">{{ nextHours }}</div>
            </div>
            <div class="flip-unit-flip-top">
              <div class="flip-digit">{{ hours }}</div>
            </div>
            <div class="flip-unit-flip-bottom">
              <div class="flip-digit">{{ nextHours }}</div>
            </div>
            <ClockLine class="flip-unit-line" />
            <div class="flip-unit-shadow"></div>
          </div>
          <div class="flip-clock-title">Hours</div>
        </div>

        <div class="flipUnitWrapper">
          <div class="flip-unit" :class="{ flipping: minutesFlip }">
            <div class="flip-unit-static-top">
              <div class="flip-digit">{{ minutes }}</div>
            </div>
            <div class="flip-unit-static-bottom">
              <div class="flip-digit">{{ nextMinutes }}</div>
            </div>
            <div class="flip-unit-flip-top">
              <div class="flip-digit">{{ minutes }}</div>
            </div>
            <div class="flip-unit-flip-bottom">
              <div class="flip-digit">{{ nextMinutes }}</div>
            </div>
            <ClockLine class="flip-unit-line" />
            <div class="flip-unit-shadow"></div>
          </div>
          <div class="flip-clock-title">Mins</div>
        </div>
      </div>
    </div>

    <div class="popupTopContent">
      <div class="popupTopTexts">
        <div class="popupTopTitles">
          <div class="popupTopTitle">USD Raised</div>
          <div class="popupTopSubtitle">$18,434,064</div>
        </div>
        <div class="popupTopSubtitle">{{ progressPercent }}</div>
      </div>
      <div class="popupTopInputRangeWrapper">
        <input
          ref="rangeInput"
          class="popupInputRange"
          min="0"
          max="100"
          v-model="progress"
          type="range"
          @input="handleRangeChange"
          @change="handleRangeChange"
        />
      </div>
    </div>
  </div>
</template>
