<script setup>
import Stars from "@/assets/svg/Stars.vue";
import AnimatedText from "@/components/AnimatedText.vue";
import PointCardImg1 from "@/assets/img/PointCardImg1.png";
import PointCardImg2 from "@/assets/img/PointCardImg2.png";
import { ref, onMounted } from "vue";
import "./PointBuy.css";

const isMobile = window.innerWidth <= 768;

const PointBuyCards = [
  {
    image: PointCardImg1,
    name: "Olivia",
    money: "Funded $200",
    subtitles: [
      {
        subtitle: "Premium Trading",
        rotate: isMobile ? "-30deg" : "-45deg",
        top: isMobile ? "110px" : "-10px",
        left: isMobile ? "0px" : "-90px",
        color: "#ffb107",
        zIndex: 9,
      },
      {
        subtitle: "Revenue Sharing",
        rotate: "30deg",
        top: isMobile ? "50px" : "-30px",
        right: isMobile ? "30px" : "-70px",
        color: "#fe8cfd",
        zIndex: 1,
      },
      {
        subtitle: "More Benefits",
        rotate: "-30deg",
        top: isMobile ? "155px" : "145px",
        right: isMobile ? "10px" : "-50px",
        color: "#4cbaff",
        zIndex: 9,
      },
    ],
  },
  {
    image: PointCardImg2,
    name: "Alex",
    money: "Funded $200",
    subtitles: [
      {
        subtitle: "Premium Trading",
        rotate: isMobile ? "-30deg" : "-20deg",
        top: isMobile ? "120px" : "300px",
        right: isMobile ? "0px" : "-60px",
        color: "#966ef3",
        zIndex: 9,
      },
      {
        subtitle: "Revenue Sharing",
        rotate: "25deg",
        top: isMobile ? "20px" : "-30px",
        right: isMobile ? "60px" : "-60px",
        color: "#eef36e",
        zIndex: 0,
      },
      {
        subtitle: "More Benefits",
        rotate: isMobile ? "25deg" : "20deg",
        top: isMobile ? "155px" : "130px",
        left: isMobile ? "10px" : "-55px",
        color: "#6ef3d8",
        zIndex: 9,
      },
    ],
  },
  {
    image: PointCardImg1,
    name: "Olivia 2",
    money: "Funded $200 2",
    subtitles: [
      {
        subtitle: "Premium Trading",
        rotate: "-30deg",
        top: isMobile ? "100px" : "-20px",
        left: isMobile ? "0px" : "-80px",
        color: "#a8f36e",
        zIndex: 9,
      },
      {
        subtitle: "Revenue Sharing",
        rotate: "40deg",
        top: isMobile ? "50px" : "-35px",
        right: isMobile ? "30px" : "-80px",
        color: "#f38d6e",
        zIndex: 1,
      },
      {
        subtitle: "More Benefits",
        rotate: "-25deg",
        top: isMobile ? "155px" : "140px",
        right: isMobile ? "10px" : "-65px",
        color: "#6e75f3",
        zIndex: 9,
      },
    ],
  },
  {
    image: PointCardImg2,
    name: "Alex 2",
    money: "Funded $200 2",
    subtitles: [
      {
        subtitle: "Premium Trading",
        rotate: isMobile ? "20deg" : "30deg",
        top: isMobile ? "100px" : "300px",
        left: isMobile ? "0px" : "-70px",
        color: "#f36e70",
        zIndex: 1,
      },
      {
        subtitle: "Revenue Sharing",
        rotate: "20deg",
        top: isMobile ? "50px" : "-20px",
        right: isMobile ? "30px" : "-75px",
        color: "#eef36e",
        zIndex: 9,
      },
      {
        subtitle: "More Benefits",
        rotate: "-20deg",
        top: "155px",
        right: isMobile ? "10px" : "-45px",
        color: "#6ef3d8",
        zIndex: 9,
      },
    ],
  },
];

const cardsScroll = ref(null);
const activeIndex = ref(0);

onMounted(() => {
  const container = cardsScroll.value;
  let isScrolling;

  container.addEventListener("scroll", () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const children = Array.from(container.children);
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;

      let closestCard = null;
      let closestDistance = Infinity;
      let closestIndex = 0;

      children.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
          closestIndex = idx;
        }
      });

      if (closestCard) {
        activeIndex.value = closestIndex;
        container.scrollTo({
          left:
            closestCard.offsetLeft -
            container.offsetWidth / 2 +
            closestCard.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }, 100);
  });

  setInterval(() => {
    const children = Array.from(container.children);
    let nextIndex = (activeIndex.value + 1) % children.length;
    const nextCard = children[nextIndex];
    if (nextCard) {
      activeIndex.value = nextIndex;
      container.scrollTo({
        left:
          nextCard.offsetLeft -
          container.offsetWidth / 2 +
          nextCard.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, 10000);
});
</script>

<template>
  <div class="pointBuy">
    <div class="pointBuySubtitlesMob pointBuySubtitlesWrap">
      <div
        class="pointBuySubtitles pointBuySubtitlesMob"
        v-for="(card, index) in PointBuyCards"
        :key="index"
      >
        <div
          v-for="(sub, i) in card.subtitles"
          :key="i"
          :class="[
            'pointBuyCardSubtitle',
            activeIndex === index ? 'active' : 'inactive',
          ]"
          :style="{
            rotate: sub.rotate,
            top: sub.top,
            left: sub.left,
            right: sub.right,
            background: sub.color,
            zIndex: sub.zIndex || 'auto',
            transitionDelay: activeIndex === index ? i * 0.3 + 's' : '0s',
          }"
        >
          <div class="pointBuyCardSubtitleCircle" />
          {{ sub.subtitle }}
        </div>
      </div>
    </div>
    <div class="pointBuyTexts">
      <AnimatedText
        class="pointBuyTitle Title"
        text="Not for Everyone. That’s the Point."
      />

      <AnimatedText
        anim-delay="0.02"
        class="Subtitle pointBuySubtitle"
        text="FundFix is built for serious capital allocators —not hype-chasers."
      />
    </div>

    <div class="pointBuyRightWrapper">
      <div
        class="pointBuySubtitles"
        v-for="(card, index) in PointBuyCards"
        :key="index"
      >
        <div
          v-for="(sub, i) in card.subtitles"
          :key="i"
          :class="[
            'pointBuyCardSubtitle',
            activeIndex === index ? 'active' : 'inactive',
          ]"
          :style="{
            rotate: sub.rotate,
            top: sub.top,
            left: sub.left,
            right: sub.right,
            background: sub.color,
            zIndex: sub.zIndex || 'auto',
            transitionDelay: activeIndex === index ? i * 0.3 + 's' : '0s',
          }"
        >
          <div class="pointBuyCardSubtitleCircle" />
          {{ sub.subtitle }}
        </div>
      </div>

      <div class="pointBuyRight">
        <div class="pointBuyCardText">
          <div class="UnderTitle pointBuyUnderTitle">
            <Stars color="#0f0f0f" /> Exclusivity
          </div>
          <div class="pointBuyCardTitle">
            Join early to unlock access, bonuses, and FundFix from day one.
          </div>
        </div>

        <div class="pointBuyCards">
          <div class="pointBuyCardsScroll" ref="cardsScroll">
            <div
              class="pointBuyCard"
              v-for="(card, index) in PointBuyCards"
              :key="index"
            >
              <div class="pointBuyCardImg">
                <img :src="card.image" alt=" " />
              </div>
              <div class="pointBuyCardTexts">
                <div class="pointBuyCardName">{{ card.name }}</div>
                <div class="pointBuyCardMoney">{{ card.money }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
