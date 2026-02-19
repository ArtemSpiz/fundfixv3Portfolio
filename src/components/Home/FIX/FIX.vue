<script setup>
import Arrow from "@/assets/svg/Arrow.vue";
import Stars from "@/assets/svg/Stars.vue";
import imageCard1 from "@/assets/img/FIXCardContent1.png";
import imageCard2 from "@/assets/img/FIXCardContent2.png";
import imageCard3 from "@/assets/img/FIXCardContent3.png";
import "./FIX.css";
import {
  ref,
  reactive,
  nextTick,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import AnimatedText from "@/components/AnimatedText.vue";

const FixCards = [
  {
    id: 1,
    title: "Private Market Access",
    subtitle: "$FIX provides scalable, secure access to private investments",
    content: imageCard1,
  },
  {
    id: 2,
    title: "Revenue Participation",
    subtitle: "A portion of fees and carry go to $FIX rewards.",
    content: imageCard2,
  },
  {
    id: 3,
    title: "Tiered Deal Access",
    subtitle: "Hold more $FIX for higher tiers, co-investments, and briefings.",
    content: imageCard3,
  },
];

const mobileActiveIndex = ref(0);
const isMobile = ref(window.innerWidth < 1024);
const displayedCards = ref([...FixCards]);
const activeCard = ref(null);
const currentIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
const touchThreshold = 50;

function onTouchStart(event) {
  if (!isMobile.value) return;
  touchStartX.value = event.touches[0].clientX;
}

function onTouchMove(event) {
  if (!isMobile.value) return;
  touchEndX.value = event.touches[0].clientX;
}

function onTouchEnd() {
  if (!isMobile.value) return;

  const deltaX = touchEndX.value - touchStartX.value;

  if (Math.abs(deltaX) > touchThreshold) {
    if (deltaX < 0) {
      const nextIndex = (mobileActiveIndex.value + 1) % FixCards.length;
      scrollToCard(nextIndex);
    } else {
      const prevIndex =
        mobileActiveIndex.value === 0
          ? FixCards.length - 1
          : mobileActiveIndex.value - 1;
      scrollToCard(prevIndex);
    }
  }

  touchStartX.value = 0;
  touchEndX.value = 0;
}

function handleResize() {
  isMobile.value = window.innerWidth < 1024;
}

function onMobileScroll(event) {
  if (!isMobile.value) return;

  const container = event.target;
  const cards = container.querySelectorAll(".fixCard");

  let closestIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const cardCenter = cardRect.left + cardRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== mobileActiveIndex.value) {
    mobileActiveIndex.value = closestIndex;
  }
}

function scrollToCard(index) {
  if (!isMobile.value) return;

  mobileActiveIndex.value = index;

  nextTick(() => {
    const container = document.querySelector(".carousel-mobile");
    const cards = container?.querySelectorAll(".fixCard");

    if (container && cards && cards[index]) {
      const targetCard = cards[index];

      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();

      const scrollLeft = container.scrollLeft;
      const cardCenter =
        cardRect.left + cardRect.width / 2 - containerRect.left + scrollLeft;
      const containerCenter = containerRect.width / 2;

      const targetScrollLeft = cardCenter - containerCenter;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  });
}

onMounted(() => {
  window.addEventListener("resize", handleResize);

  if (isMobile.value) {
    mobileActiveIndex.value = 0;
    setTimeout(() => {
      scrollToCard(0);
    }, 100);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const dragState = reactive({
  dragging: false,
  startX: 0,
  currentX: 0,
  translateX: 0,
  rotate: 0,
  animationInProgress: false,
  buttonAnimation: false,
});

const activeCardIndex = computed(() => {
  if (isMobile.value) {
    return mobileActiveIndex.value;
  }
  const activeCardId = displayedCards.value[0]?.id;
  return FixCards.findIndex((card) => card.id === activeCardId);
});

async function nextCard() {
  if (dragState.animationInProgress || dragState.buttonAnimation) return;

  if (isMobile.value) {
    const nextIndex = (mobileActiveIndex.value + 1) % FixCards.length;
    scrollToCard(nextIndex);
    return;
  }

  dragState.buttonAnimation = true;
  dragState.translateX = window.innerWidth * 1.2;
  dragState.rotate = 30;

  setTimeout(() => {
    const newCards = [...displayedCards.value];
    const first = newCards.shift();
    if (first) {
      newCards.push(first);
    }
    displayedCards.value = newCards;
    currentIndex.value = (currentIndex.value + 1) % FixCards.length;

    nextTick(() => {
      dragState.translateX = 0;
      dragState.rotate = 0;
      dragState.buttonAnimation = false;
    });
  }, 300);
}

async function prevCard() {
  if (dragState.animationInProgress || dragState.buttonAnimation) return;

  if (isMobile.value) {
    const prevIndex =
      mobileActiveIndex.value === 0
        ? FixCards.length - 1
        : mobileActiveIndex.value - 1;
    scrollToCard(prevIndex);
    return;
  }

  dragState.buttonAnimation = true;
  dragState.translateX = -window.innerWidth * 1.2;
  dragState.rotate = -30;

  setTimeout(() => {
    const newCards = [...displayedCards.value];
    const last = newCards.pop();
    if (last) {
      newCards.unshift(last);
    }
    displayedCards.value = newCards;
    currentIndex.value =
      currentIndex.value === 0 ? FixCards.length - 1 : currentIndex.value - 1;

    nextTick(() => {
      dragState.translateX = 0;
      dragState.rotate = 0;
      dragState.buttonAnimation = false;
    });
  }, 300);
}

function goToCard(targetIndex) {
  if (isMobile.value) {
    scrollToCard(targetIndex);
    return;
  }

  if (
    dragState.animationInProgress ||
    dragState.buttonAnimation ||
    targetIndex === activeCardIndex.value
  )
    return;

  const currentActiveIndex = activeCardIndex.value;
  const totalCards = FixCards.length;

  let stepsForward =
    (targetIndex - currentActiveIndex + totalCards) % totalCards;
  let stepsBackward =
    (currentActiveIndex - targetIndex + totalCards) % totalCards;

  if (stepsForward <= stepsBackward) {
    for (let i = 0; i < stepsForward; i++) {
      setTimeout(() => nextCard(), i * 100);
    }
  } else {
    for (let i = 0; i < stepsBackward; i++) {
      setTimeout(() => prevCard(), i * 100);
    }
  }
}

function getCardStyle(index) {
  if (index === 0) {
    const baseStyle = {
      cursor: dragState.dragging ? "grabbing" : "grab",
      zIndex: 10,
      opacity: 1,
    };

    if (
      dragState.dragging ||
      dragState.animationInProgress ||
      dragState.buttonAnimation
    ) {
      let transition = "";

      if (dragState.animationInProgress) {
        transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease";
      } else if (dragState.buttonAnimation) {
        transition =
          "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.5s ease";
      }

      const opacity =
        (dragState.animationInProgress || dragState.buttonAnimation) &&
        Math.abs(dragState.translateX) > window.innerWidth * 0.5
          ? 0
          : 1;

      return {
        ...baseStyle,
        transform: `translateX(${dragState.translateX}px) rotate(${dragState.rotate}deg)`,
        transition,
        opacity,
      };
    }

    return baseStyle;
  }

  return {
    zIndex: 9 - index,
    opacity: 0.2,
    transition: "all 0.5s ease-out",
  };
}

function onPointerDown(event) {
  if (isMobile.value) return;
  if (dragState.animationInProgress || dragState.buttonAnimation) return;

  dragState.dragging = true;
  dragState.startX =
    event.clientX || (event.touches && event.touches[0].clientX) || 0;
  dragState.currentX = dragState.startX;

  if (!isMobile.value) event.preventDefault();

  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}

function onPointerMove(event) {
  if (!dragState.dragging) return;

  if (!isMobile.value) event.preventDefault();

  dragState.currentX =
    event.clientX || (event.touches && event.touches[0].clientX) || 0;
  dragState.translateX = dragState.currentX - dragState.startX;

  const maxTranslate = window.innerWidth * 0.6;
  dragState.translateX = Math.max(
    -maxTranslate,
    Math.min(maxTranslate, dragState.translateX)
  );
  dragState.rotate = (dragState.translateX / window.innerWidth) * 20;
}

async function onPointerUp() {
  if (isMobile.value) return;
  if (!dragState.dragging) return;

  dragState.dragging = false;
  const threshold = 50;

  if (Math.abs(dragState.translateX) > threshold) {
    const direction = dragState.translateX > 0 ? 1 : -1;
    dragState.animationInProgress = true;

    const exitTranslateX = direction * window.innerWidth * 1.2;
    const exitRotate = direction * 30;

    dragState.translateX = exitTranslateX;
    dragState.rotate = exitRotate;

    setTimeout(() => {
      const newCards = [...displayedCards.value];
      if (direction > 0) {
        const first = newCards.shift();
        if (first) newCards.push(first);
        currentIndex.value = (currentIndex.value + 1) % FixCards.length;
      } else {
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        currentIndex.value =
          currentIndex.value === 0
            ? FixCards.length - 1
            : currentIndex.value - 1;
      }
      displayedCards.value = newCards;

      nextTick(() => {
        dragState.translateX = 0;
        dragState.rotate = 0;
        dragState.animationInProgress = false;
      });
    }, 300);
  } else {
    dragState.translateX = 0;
    dragState.rotate = 0;
  }

  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerUp);
}
</script>

<template>
  <div id="product" class="fix">
    <div class="container containerFix">
      <div class="fixLeft">
        <div class="fixTexts">
          <div class="fixTitles">
            <div class="UnderTitle">
              <Stars />
              <AnimatedText text="Utility Token" />
            </div>

            <div class="Title fixTitleWrapper">
              <AnimatedText class="fixTitle" text="$FIX Token:" />
              <AnimatedText class="fixTitleSpan" text="Infinite Access." />
            </div>
          </div>

          <AnimatedText
            anim-delay="0.01"
            class="Subtitle fixSub"
            text="At the core of the FundFix platform lies $FIX—a versatile utility token designed to provide scalable, secure, and permissioned access to a broad array of private market investment opportunities."
          />
        </div>

        <div class="fixBtns desktop">
          <div
            class="fixArrow active"
            :class="{ 'button-pressed': dragState.buttonAnimation }"
            @click="nextCard"
          >
            <Arrow />
          </div>
          <div
            class="fixArrow"
            :class="{ 'button-pressed': dragState.buttonAnimation }"
            @click="prevCard"
          >
            <Arrow class="rotateArrowFix" />
          </div>
        </div>
      </div>

      <div class="fixCardsWrapper">
        <div
          class="fixCards"
          :class="{ 'carousel-mobile': isMobile }"
          @scroll="onMobileScroll"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div class="fixCardsPags">
            <div class="fixCardsPag"></div>
          </div>

          <div
            class="fixCard"
            v-for="(card, index) in isMobile ? FixCards : displayedCards"
            :key="`${isMobile ? 'mobile' : 'desktop'}-${card.id}`"
            :class="{
              activeCard:
                (isMobile && index === mobileActiveIndex) ||
                (!isMobile && index === 0),
            }"
            :ref="index === 0 && !isMobile ? (el) => (activeCard = el) : null"
            @pointerdown="
              !isMobile && index === 0 ? onPointerDown($event) : null
            "
            :style="isMobile ? {} : getCardStyle(index)"
          >
            <div class="fixCardTexts">
              <div class="fixCardTitle">{{ card.title }}</div>
              <div class="fixCardSubtitle">{{ card.subtitle }}</div>
            </div>

            <div class="fixCardContent">
              <img :src="card.content" alt="" draggable="false" />
            </div>
          </div>

          <div class="fixCardsPags">
            <div
              v-for="(card, index) in FixCards"
              :key="card.id"
              class="fixCardsPag"
              :class="{ active: index === activeCardIndex }"
              @click="goToCard(index)"
            ></div>
          </div>
        </div>
      </div>

      <div class="fixBtns mobile">
        <div
          class="fixArrow active"
          :class="{ 'button-pressed': dragState.buttonAnimation }"
          @click="nextCard"
        >
          <Arrow />
        </div>
        <div
          class="fixArrow"
          :class="{ 'button-pressed': dragState.buttonAnimation }"
          @click="prevCard"
        >
          <Arrow class="rotateArrowFix" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
