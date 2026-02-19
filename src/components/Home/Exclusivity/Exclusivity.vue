<script setup>
import ExclusivityIcon1 from "@/assets/svg/ExclusivityIcon1.vue";
import ExclusivityIcon2 from "@/assets/svg/ExclusivityIcon2.vue";
import ExclusivityIcon3 from "@/assets/svg/ExclusivityIcon3.vue";
import ExclusivityIcon4 from "@/assets/svg/ExclusivityIcon4.vue";
import ExclusivityIcon5 from "@/assets/svg/ExclusivityIcon5.vue";
import ExclusivityIcon6 from "@/assets/svg/ExclusivityIcon6.vue";
import ExclusivityIcon7 from "@/assets/svg/ExclusivityIcon7.vue";
import Stars from "@/assets/svg/Stars.vue";
import "./Exclusivity.css";
import AnimatedText from "@/components/AnimatedText.vue";

const ExclusivityCards = [
  {
    icon: ExclusivityIcon1,
    title: "Accredited Investors",
  },
  {
    icon: ExclusivityIcon2,
    title: "Startup Operators",
  },
  {
    icon: ExclusivityIcon3,
    title: "Web3",
  },
  {
    icon: ExclusivityIcon4,
    title: "Native Capital",
  },
  {
    icon: ExclusivityIcon5,
    title: "LPs",
  },
  {
    icon: ExclusivityIcon6,
    title: "Managers",
  },
  {
    icon: ExclusivityIcon7,
    title: "Ecosystem Partners",
  },
];
</script>

<template>
  <div class="exclusivity">
    <div class="container exclusivityCont">
      <div class="exclusivityTexts">
        <div class="exclusivityTitles">
          <div class="UnderTitle">
            <Stars />
            <AnimatedText text="Exclusivity" />
          </div>
          <AnimatedText
            class="exclusivityTitle Title"
            text="Not for Everyone. That’s the Point."
          />
        </div>

        <AnimatedText
          anim-delay="0.02"
          class="Subtitle exclusivitySubtitle"
          text="FundFix is built for serious capital allocators — not hype-chasers."
        />
      </div>

      <div class="exclusivityCardsWrapper">
        <div class="exclusivityCards exclusivityCardsDesktop">
          <div
            class="exclusivityCard"
            v-for="(card, index) in ExclusivityCards"
            :key="index"
            :class="`card-${index}`"
          >
            <component
              class="exclusivityCardIcon"
              :is="card.icon"
              :class="`cardIcon-${index}`"
            />
            <div class="exclusivityCardTitle" :class="`cardTitle-${index}`">
              {{ card.title }}
            </div>
          </div>
        </div>

        <div class="exclusivityCards exclusivityScrollLeft">
          <div
            class="exclusivityCard"
            v-for="(card, index) in ExclusivityCards.concat(
              ExclusivityCards,
              ExclusivityCards
            )"
            :key="'left-' + index"
            :class="`card-${index % ExclusivityCards.length}`"
          >
            <component
              class="exclusivityCardIcon"
              :is="card.icon"
              :class="`cardIcon-${index % ExclusivityCards.length}`"
            />
            <div
              class="exclusivityCardTitle"
              :class="`cardTitle-${index % ExclusivityCards.length}`"
            >
              {{ card.title }}
            </div>
          </div>
        </div>

        <div class="exclusivityCards exclusivityScrollRight">
          <div
            class="exclusivityCard"
            v-for="(card, index) in ExclusivityCards.concat(
              ExclusivityCards,
              ExclusivityCards
            )"
            :key="'right-' + index"
            :class="`card-${index % ExclusivityCards.length}`"
          >
            <component
              class="exclusivityCardIcon"
              :is="card.icon"
              :class="`cardIcon-${index % ExclusivityCards.length}`"
            />
            <div
              class="exclusivityCardTitle"
              :class="`cardTitle-${index % ExclusivityCards.length}`"
            >
              {{ card.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
