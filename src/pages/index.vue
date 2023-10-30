<template>
  <div class="top-filter">
    <h1>Top tracks</h1>
    <PeriodSelector />
  </div>
  <div class="tracks">
    <Track v-for="track in store.topTracks" :track="track" />
  </div>
  <!-- <Chard /> -->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Track from "@/components/Track.vue";
import { useTopStore } from "@/stores/tracks";
import Chard from "@/components/Chard.vue";
import PeriodSelector from "@/components/PeriodSelector.vue";

const store = useTopStore();
onMounted(() => {
  // store.fetchTopGenres();
});
</script>

<style scoped>
.top-filter {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.tracks {
  max-height: 50vh;
  overflow: auto;
}
</style>
