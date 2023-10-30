<template>
    <section class="container">
        <div class="top-filter">
            <div class="dropdown">
                <h1 @click.stop="menu = !menu" ref="button" class="top">{{ route.query.top !== 'recent' ? 'Top' : '' }} {{
                    route.query.top || 'tracks' }}
                    <Icon icon="material-symbols:arrow-drop-down-rounded" />
                </h1>
                <Transition name="menu">
                    <div ref="dropdown" v-if="menu" class="menu">
                        <span @click="() => { router.push({ query: { top: 'tracks' } }); menu = false }">Tracks</span>
                        <span @click="() => { router.push({ query: { top: 'artists' } }); menu = false }">Artist</span>
                        <span @click="() => { router.push({ query: { top: 'genres' } }); menu = false }">Genres</span>
                        <span @click="() => { router.push({ query: { top: 'recent' } }); menu = false }">Recent</span>
                    </div>
                </Transition>
            </div>
            <div class="playlist-container">
                <!-- <div class="playlist-item">
                    <button id="show-modal" @click="showModal = true">Create Playlist</button>
                </div> -->
                <PeriodSelector v-if="route.query.top !== 'recent'" />
            </div>
        </div>

        <div class="tracks">
            <Placeholder v-if="store.loading" v-for="index in 50" :key="index" />

            <Artist v-else-if="route.query.top === 'artists'" v-for="artist in store.topArtist" :artist="artist"
                :key="artist.id" />
            <Genre v-else-if="route.query.top === 'genres'" v-for="genre, index in store.topGenres" :index="index"
                :genre="genre" :key="genre.name" />
            <Track v-else-if="route.query.top === 'recent'" v-for="play in store.recentPlays" :track="play.track"
                :key="play.track.id" :played_at="play.played_at" />
            <Track v-else v-for="track in store.topTracks" :track="track" :key="track.id" />
        </div>
    </section>
    <!-- <Chard /> -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal v-show="showModal" @close="showModal = false">
            <template #header>
                <h3>custom header</h3>
            </template>
        </modal>
    </Teleport>
</template>
  
<script lang="ts" setup>
import Modal from '@/components/PlaylistModel.vue';

import { onMounted, ref } from "vue";
import Track from "@/components/Track.vue";
import Artist from "@/components/Artist.vue";
import Placeholder from "@/components/Placeholder.vue";
import Genre from "@/components/Genre.vue";
import { useTopStore } from "@/stores/tracks";
import Chard from "@/components/Chard.vue";
import { useRoute, useRouter } from "vue-router";
import PeriodSelector from "@/components/PeriodSelector.vue";
import { Icon } from '@iconify/vue';

import { onClickOutside } from "@vueuse/core";

const showModal = ref(false);

const store = useTopStore();
const route = useRoute()
const router = useRouter()

const menu = ref(false);
const dropdown = ref();
const button = ref();

onClickOutside(
    dropdown,
    () => {
        menu.value = !menu.value;
    },
    { ignore: [button] }
);

onMounted(() => {
    // store.fetchTopGenres();
    store.fetchRecentlyPlayed()
});
</script>
  
<style lang="scss" scoped>
.top-filter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;

    .top {
        padding: 1px .375rem;
        border-radius: .25rem;
        cursor: pointer;
        user-select: none;
        /* &:hover {
            background-color: var(--soft);
        } */
    }
}

h1 {
    display: flex;
    align-items: center;
    font-size: 2rem;
}


.container {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 70px);
    gap: 2rem;
    padding: 0 2rem;
}

.playlist-container {
    height: 100%;
    display: flex;
    align-items: center;
}

.playlist-item {
    height: 100%;
    justify-content: center;
    margin-right: 5px;
    align-items: center;
    padding: .25rem;
    background: var(--soft);
    border-radius: .25rem;

    button {
        background-color: transparent;
        padding: 9px 25px;
        font-family: Inter;
        font-style: italic;
        font-weight: bold;
        transition-duration: 0.5s;
        cursor: pointer;
        border: none;
        text-align: right;
        display: flex;
        color: white;
        border-radius: 5px;
        font-size: 15px;
        height: 100%;
    }
}

.playlist-item button:hover {
    background: var(--accent);
}

@media only screen and (max-width: 584px) {
    .top-filter {
        flex-direction: column;
        gap: 1rem;
    }

    .container {
        gap: 1rem;
        padding: 0 .5rem;

    }
}

.tracks {
    overflow: auto;
    flex: 1;
    display: inline-block;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    min-height: min-content;
    padding-bottom: 2rem;
}

.dropdown {
    position: relative;
}

.menu {
    position: absolute;
    width: 100%;
    min-width: 216px;
    margin-top: .25rem;
    left: 0;
    backdrop-filter: blur(10px);
    background-color: var(--soft);
    border-radius: 4px;
    padding: 0.5rem;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    span {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        border-radius: 2px;
        border: none;
        transition: all .5s ease-in-out;
        font-size: 1.25rem;
        background-color: var(--accent-light);
        user-select: none;

        &:hover {
            cursor: pointer;
            background-color: var(--accent);
        }
    }
}
</style>
  