<template>
    <div class="track">
        <figure :class="{ skeleton: isLoading }"><img loading="lazy" :src="artist.images[2].url" alt="cover"
                height="64px" /></figure>
        <div class="info">
            {{ artist.name }}
            <div class="artist">
                <a v-for="genre, index in artist.genres">{{ genre }}{{
                    artist.genres.length > 1 && index !==
                    artist.genres.length - 1 ? ", " : '' }}</a>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import type { SpotifyArtist } from "@/models/top";
import { useImage } from '@vueuse/core'

const props = defineProps<{
    artist: SpotifyArtist;
}>();

const { isLoading } = useImage({ src: props.artist.images[2].url })
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
  