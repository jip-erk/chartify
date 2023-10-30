<template>
  <div class="container">
    <div
      v-for="(genre, index) in store.topGenres"
      :key="index"
      :style="{ width: genre.total + '%' }"
      class="bar"
    >
      {{ genre.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTopStore } from "@/stores/tracks";

const store = useTopStore();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 5rem;
  .bar {
    transition: all 2s ease-in-out;
    height: 3rem;
    background-color: lightblue;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    padding: 1rem;
  }
}
</style>
