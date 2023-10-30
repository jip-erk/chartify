<template>
    <div class="track">
        <figure>
            #{{ index + 1 }}
        </figure>
        <div class=" info">
            {{ genre.name }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { Popularity } from '@/models/top';

const props = defineProps<{
    genre: Popularity;
    index: number;
}>();
</script>
  
<style lang="scss" scoped>
.track {
    display: flex;
    align-items: center;
    background-color: var(--soft);
    border-radius: .25rem;
    padding: .375rem;
    gap: 1rem;
    margin-right: 1rem;
    position: relative;
    font-size: 1.05rem;

    figure {
        height: 64px;
        width: 64px;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--accent-light);
    }

    img {
        border-radius: .25rem;
        height: 64px;
        width: 64px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: .25rem;

        .artist {
            display: flex;
            gap: 4px;
        }

        a {
            color: var(--text-offset);
            text-decoration: none;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
  