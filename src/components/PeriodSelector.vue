<template>
    <div class="selector" @mouseleave="position = store.period">
        <div class="current" :style="{ left: pos }">
            <div class="inner" />
        </div>
        <span @mouseenter="position = 'short_term'" @click="store.period = 'short_term'">4 weeks</span>
        <span @mouseenter="position = 'medium_term'" @click="store.period = 'medium_term'">6 months</span>
        <span @mouseenter="position = 'long_term'" @click="store.period = 'long_term'">lifetime</span>
    </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue'
import { useTopStore } from "@/stores/tracks";
import { toRef } from '@vueuse/core';

const store = useTopStore();
const position = toRef(store.period);

const pos = computed(() => {
    if (position.value === 'medium_term') return '95px'
    if (position.value === 'long_term') return '192px'

    return '0px'
})
</script>
  
<style lang="scss" scoped>
.selector {
    height: 100%;
    display: flex;
    align-items: center;
    padding: .25rem;
    // gap: .25rem;
    background-color: var(--soft);
    border-radius: .25rem;
    position: relative;
    max-width: 296px;

    .current {
        height: 100%;
        width: 6.5rem;
        position: absolute;
        padding: .25rem;
        transition: all .25s ease-in-out;

        .inner {
            border-radius: .25rem;

            background-color: var(--accent);
            width: 100%;
            height: 100%;
        }
    }

    span {
        z-index: 4;
        padding: .375rem 1rem;
        cursor: pointer;
        width: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        border-radius: .25rem;

        &:hover {
            text-decoration: none;
            color: #47abff;
        }
    }
}
</style>
  