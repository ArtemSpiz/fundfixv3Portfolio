<script setup>
import Stars from "@/assets/svg/Stars.vue";
import institutionsLogoLeft from "@/assets/img/InstitutionsLeftLogo.png";
import institutionsLogoRight from "@/assets/img/InstitutionsRightLogo.png";
import ArrowBtn from "@/assets/svg/ArrowBtn.vue";
import "./Institutions.css";
import AnimatedText from "@/components/AnimatedText.vue";
import Footer from "@/layout/Footer/Footer.vue";
</script>

<template>
  <div class="institutionsWrapper">
    <div class="institutions">
      <div class="institutionsCard">
        <div class="institutionsLogoLeft">
          <img :src="institutionsLogoLeft" alt="" />
        </div>
        <div class="institutionsLogoRight">
          <img :src="institutionsLogoRight" alt="" />
        </div>

        <div class="institutionsTexts">
          <div class="institutionsTitles">
            <div class="UnderTitle institutionsUnderTitle">
              <Stars color="#0f0f0f" />
              <AnimatedText text="Exclusivity" />
            </div>

            <AnimatedText
              class="institutionsTitle instTitleDesktop"
              text="This Is What the Institutions Never Wanted You to Access"
            />

            <div class="institutionsTitle instTitleMobil">
              <AnimatedText class="institutionsTitle" text="This Is What the" />
              <AnimatedText
                class="institutionsTitle"
                text="Institutions Never"
              />
              <AnimatedText
                class="institutionsTitle"
                text="Wanted You to Access"
              />
            </div>
          </div>

          <AnimatedText
            anim-delay="0.02"
            class="institutionsSubtitle Subtitle"
            text="FundFix isn’t here to democratize hype — it brings discipline, infrastructure, and upside to early movers."
          />
        </div>

        <button class="institutionsBtn jelly-wave">
          Join to FundFix <ArrowBtn />
        </button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped></style>
