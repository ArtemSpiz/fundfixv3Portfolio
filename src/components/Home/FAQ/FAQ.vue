<script setup>
import ArrowFAQ from "@/assets/svg/ArrowFAQ.vue";
import Stars from "@/assets/svg/Stars.vue";
import "./FAQ.css";
import { ref } from "vue";
import AnimatedText from "@/components/AnimatedText.vue";

const FaqCards = [
  {
    title: "Who can invest in FundFix?",
    subtitle:
      "Yes. Smart contracts audited by CertiK, funds secured via multi-sig, full KYC/AML compliance.",
  },
  {
    title: "Is this another crypto launchpad?",
    subtitle:
      "Yes. Smart contracts audited by CertiK, funds secured via multi-sig, full KYC/AML compliance.",
  },
  {
    title: "Do I need to be accredited?",
    subtitle:
      "Yes. Smart contracts audited by CertiK, funds secured via multi-sig, full KYC/AML compliance.",
  },
  {
    title: "Are the deals legit?",
    subtitle:
      "Yes. Smart contracts audited by CertiK, funds secured via multi-sig, full KYC/AML compliance.",
  },
  {
    title: "Is this secure?",
    subtitle:
      "Yes. Smart contracts audited by CertiK, funds secured via multi-sig, full KYC/AML compliance.",
  },
];

const opened = ref(Array(FaqCards.length).fill(false));

const toggle = (index) => {
  opened.value[index] = !opened.value[index];
};
</script>

<template>
  <div id="how-it-works" class="faq">
    <div class="faqBg" />
    <div class="faqTexts">
      <div class="UnderTitle">
        <Stars />
        <AnimatedText text="FAQ" />
      </div>
      <AnimatedText class="Title faqTitle" text="Frequently Asked Questions" />
    </div>
    <div class="faqCards">
      <div
        class="faqCard"
        v-for="(card, index) in FaqCards"
        :key="index"
        @click="toggle(index)"
        :class="{ 'faq-opened': opened[index] }"
      >
        <div class="faqCardTop">
          <div class="faqCardTitle">{{ card.title }}</div>
          <div class="faqCardArrow" :class="{ rotated: opened[index] }">
            <ArrowFAQ />
          </div>
        </div>

        <div class="faq-content-wrapper" :class="{ 'is-open': opened[index] }">
          <div class="faq-content-inner">
            <div class="faqCardSubtitle">
              {{ card.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
