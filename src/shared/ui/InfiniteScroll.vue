<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineEmits } from "vue";

const emit = defineEmits<{ triggerIntersection: [] }>();

const trigger = ref<HTMLDivElement>();

const observer = new IntersectionObserver(
  (entires) => {
    if (entires[0].isIntersecting) {
      emit("triggerIntersection");
    }
  },
  { threshold: 1 }
);

onMounted(() => observer.observe(trigger.value as HTMLDivElement));

onUnmounted(() => observer.disconnect());
</script>

<template>
  <div ref="trigger" />
</template>
