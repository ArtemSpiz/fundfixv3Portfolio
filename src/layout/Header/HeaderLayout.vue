<script setup>
import { ref, defineProps, onMounted, onUnmounted, watch } from "vue";
import "./Header.css";
import logo from "@/assets/img/logoHeader.png";
import Burger from "@/assets/svg/Buger.vue";
import Cross from "@/assets/svg/Cross.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const HeaderLinks = [
  { title: "Home", target: "/" },
  { title: "Product", target: "#product" },
  { title: "About", target: "#about" },
  { title: "How it works", target: "#how-it-works" },
  { title: "Tokenomics", target: "#tokenomics" },
  { title: "How to Buy", target: "/how-to-buy" },
];

const isScaledIn = ref(false);

const activeLink = ref(0);

function updateActiveLinkByRoute() {
  const currentPath = route.path;
  const index = HeaderLinks.findIndex((link) => {
    if (link.target.startsWith("/")) {
      return link.target === currentPath;
    }
    return false;
  });
  if (index !== -1) {
    activeLink.value = index;
  } else {
    activeLink.value = 0;
  }
}

onMounted(() => {
  updateActiveLinkByRoute();
});

watch(
  () => route.path,
  () => {
    updateActiveLinkByRoute();
  }
);

function resetActiveToRoute() {
  const currentPath = route.path;
  const index = HeaderLinks.findIndex((link) => {
    if (link.target.startsWith("/")) {
      return link.target === currentPath;
    }
    return false;
  });
  if (index !== -1) {
    activeLink.value = index;
  } else {
    activeLink.value = 0;
  }
}

function setActive(index) {
  activeLink.value = index;
}

const props = defineProps({
  onScrollToTokenomics: Function,
  isOnRoadmap: Boolean,
  isOnTokenomics: Boolean,
});

function scrollToSection(target, index) {
  if (target.startsWith("/")) {
    router.push(target);
    activeLink.value = index;
    return;
  }

  const el = document.querySelector(target);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
    activeLink.value = index;
  }
}

const isOnWhite = ref(false);
const whiteSection = ref(null);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isOnWhite.value = entry.isIntersecting;
    },
    { threshold: 0.1 }
  );

  if (whiteSection.value) {
    observer.observe(whiteSection.value);
  }

  setTimeout(() => {
    isScaledIn.value = true;
  }, 100);
});

onUnmounted(() => {
  if (observer && whiteSection.value) {
    observer.unobserve(whiteSection.value);
  }
});

const isBurgerOpen = ref(false);

function toggleBurger() {
  isBurgerOpen.value = !isBurgerOpen.value;
}

</script>

<template>
  <div class="headerWrapper">
    <div
      class="header single-pulse-wave"
      :class="{ 'scaled-in': isScaledIn, burgerOpen: isBurgerOpen }"
    >
      <div class="headerMobWrapper">
        <router-link to="/" class="headerLogo">
          <img
            :src="logo"
            alt=""
            :class="{
              'on-roadmap': props.isOnRoadmap || props.isOnTokenomics,
              burgerOpen: isBurgerOpen,
            }"
          />
        </router-link>
        <div class="headerRight">
          <div class="headerLinks">
            <div v-for="(link, index) in HeaderLinks" :key="index">
              <div
                class="headerLink"
                @click="scrollToSection(link.target, index)"
                @mouseenter="setActive(index)"
                @mouseleave="resetActiveToRoute"
                :class="{
                  active: index === activeLink,
                  'on-roadmap': props.isOnRoadmap || props.isOnTokenomics,
                }"
              >
                {{ link.title }}
              </div>
            </div>
          </div>

          <button
            :class="{
              'on-roadmap': props.isOnRoadmap || props.isOnTokenomics,
              burgerOpen: isBurgerOpen,
            }"
            class="headerBtn jelly-wave"
          >
            Connect Wallet
          </button>

          <div class="burgerOpen" @click="toggleBurger">
            <component
              class="burgerOpenSvg"
              :is="isBurgerOpen ? Cross : Burger"
              :class="{
                'on-roadmap': props.isOnRoadmap || props.isOnTokenomics,
                burgerOpen: isBurgerOpen,
              }"
            />
          </div>
        </div>
      </div>

      <transition name="burger-slide">
        <div class="burgerMenu" v-if="isBurgerOpen">
          <div class="headerLinks headerLinksMob">
            <div
              v-for="(link, index) in HeaderLinks"
              :key="index"
              class="headerLink"
              @click="
                scrollToSection(link.target, index);
                isBurgerOpen = false;
              "
              @mouseenter="setActive(index)"
              @mouseleave="resetActiveToRoute"
              :class="{
                active: index === activeLink,
                'on-roadmap': props.isOnRoadmap || props.isOnTokenomics,
                burgerOpen: isBurgerOpen,
              }"
            >
              {{ link.title }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped></style>
