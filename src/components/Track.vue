<template>
  <div class="track">
    <div class="flex">
      <figure :class="{ skeleton: isLoading }"><img loading="lazy" :src="track.album.images[2].url" alt="cover"
          height="64px" /></figure>
      <div class="info">
        {{ track.name }}
        <div class="artist">
          <RouterLink :to="`artist/${artist.id}`" v-for="artist, index in track.artists">{{ artist.name
          }}{{
  track.artists.length > 1 && index !==
  track.artists.length - 1 ? ", " : '' }}</RouterLink>
        </div>
      </div>
    </div>
    <span class="time">{{ played_at ? dayjs(played_at).fromNow() : '' }}</span>

  </div>
</template>

<script setup lang="ts">
import type { SpotifyTrack } from "@/models/top";
import { useImage } from '@vueuse/core'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

const props = defineProps<{
  track: SpotifyTrack;
  played_at?: string
}>();

const { isLoading } = useImage({ src: props.track.album.images[2].url })
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time {
  margin-right: 1rem;
  color: var(--text-offset);

}

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
  justify-content: space-between;

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

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
