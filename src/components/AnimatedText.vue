<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  threshold: {
    type: Number,
    default: 1,
  },
  once: {
    type: Boolean,
    default: true,
  },
  animDelay: {
    type: Number,
    default: 0.03,
  },
});

const words = props.text.split(/(\s+)/);
const isVisible = ref(false);
const animatedRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (props.once) observer.disconnect();
      } else if (!props.once) {
        isVisible.value = false;
      }
    },
    { threshold: props.threshold }
  );

  if (animatedRef.value) {
    observer.observe(animatedRef.value);
  }
});
</script>

<template>
  <div class="animated-text" ref="animatedRef">
    <span
      v-for="(word, wordIndex) in words"
      :key="wordIndex"
      class="word-wrapper"
    >
      <span
        v-for="(letter, letterIndex) in word.split('')"
        :key="`${wordIndex}-${letterIndex}`"
        :class="['letter', { visible: isVisible }]"
        :style="
          isVisible
            ? {
                animationDelay: `${
                  (wordIndex * 5 + letterIndex) * props.animDelay
                }s`,
                animationPlayState: 'running',
              }
            : { animationPlayState: 'paused' }
        "
      >
        {{ letter === " " ? "\u00A0" : letter }}
      </span>
    </span>
  </div>
</template>

<style scoped>
.animated-text {
  display: inline;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.word-wrapper {
  display: inline-block;
  white-space: nowrap;
}

.letter {
  display: inline-block;
  opacity: 0;
  filter: blur(14px);
  transform: translateY(40px);
  animation: fadeInBlurUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-play-state: paused;
}

@keyframes fadeInBlurUp {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}
</style>
