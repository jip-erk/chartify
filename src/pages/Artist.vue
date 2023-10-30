<template>
    <div class="container">
        <!-- <div class="back">
            <Icon icon="material-symbols:arrow-back-rounded" style="font-size: 2rem;" />
            <p>back</p>
        </div> -->
        <div class="header" v-if="artist">
            <img :src="artist.images[2].url" alt="artist">
            <div class="info">
                <h1>{{ artist.name }}</h1>
                <span>{{ format(artist.followers.total) }} followers</span>
                <a :href="`https://open.spotify.com/artist/${artist.id}`" target="_blank">
                    <Icon icon="mdi:spotify" style="font-size: 1.5rem;" />
                </a>
            </div>
        </div>
        <div class="body">
            <div class="selector">
                <h1>Top Tracks</h1>
                <div class="btn">
                    <Icon icon="material-symbols:arrow-left-rounded" style="font-size: 2.25rem;"
                        @click=" trackPos > 0 ? trackPos -= 136 : ''" />
                    <Icon icon="material-symbols:arrow-right-rounded" style="font-size: 2.25rem;"
                        @click=" trackPos < (120 * (tracks.length - 7)) ? trackPos += 136 : ''" />
                </div>
            </div>
            <div class="trackCont">
                <div class="tracks" :style="{ transform: `translateX(-${trackPos}px)` }">
                    <div v-for="track in tracks" class="track">
                        <img :src="track.album.images[1].url" alt="">
                        <div class="title">
                            <h3>{{ track.name }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="selector">
                <h1>Top Albums</h1>
                <div class="btn">
                    <Icon icon="material-symbols:arrow-left-rounded" style="font-size: 2.25rem;"
                        @click=" albumPos > 0 ? albumPos -= 136 : ''" />
                    <Icon icon="material-symbols:arrow-right-rounded" style="font-size: 2.25rem;"
                        @click=" albumPos < (120 * (album.length - 6)) ? albumPos += 136 : ''" />
                </div>
            </div>

            <div class="trackCont">
                <div class="tracks" :style="{ transform: `translateX(-${albumPos}px)` }">
                    <div v-for="track in album" class="track">
                        <img :src="track.images[1].url" alt="">
                        <div class="title">
                            <h3>{{ track.name }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Icon } from '@iconify/vue';

const route = useRoute()

const loading = ref(false);
const artist = ref()
const tracks = ref()
const album = ref()

const trackPos = ref(0)
const albumPos = ref(0)

onMounted(async () => {
    const res = await fetchArtist(route.params.id as string);
    console.log(res)
    artist.value = res
    await fetchArtistAlbums(route.params.id as string);
    await fetchArtistTracks(route.params.id as string);
});


const fetchArtist = async (id: string) => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const fetchArtistAlbums = async (id: string) => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${id}/albums`,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        );

        album.value = response.data.items;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};
const fetchArtistTracks = async (id: string) => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        );

        tracks.value = response.data.tracks;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};

const format = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5rem;
    // gap: 2rem;
    // margin-top: 1rem;

    .back {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
        color: var(--text-offset);

        p {
            font-size: 1.5rem;
        }
    }



    .body {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-radius: .5rem;
        // padding: 2rem;
        max-height: 400px;


        .selector {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                display: flex;
                gap: .5rem;

                svg {
                    background-color: var(--soft);
                    border-radius: 50%;
                    cursor: pointer;
                    // color: var(--accent);
                }
            }
        }

        // max-height: calc(100vh - 70px);
        // overflow: hidden;
        .trackCont {
            overflow: hidden;
            min-height: 165px;
        }

        .tracks {
            transition-timing-function: cubic-bezier(.4, 0, .2, 1);
            transition-duration: .3s;
            transition-property: transform;

            width: 100%;
            display: flex;
            height: 100%;

            gap: 1rem;

            .title {
                font-size: 1rem;
                padding: .5rem;
                background-color: var(--soft);
                max-height: 35px;
                display: flex;
                overflow: hidden;
                max-width: 120px;
                text-overflow: ellipsis;

                h3 {
                    text-overflow: ellipsis;

                    font-size: 1rem;
                    white-space: nowrap;
                }
            }

            img {
                user-select: none;
                height: 120px;
                border-radius: .25rem;
                width: 120px;
                white-space: nowrap;
                overflow: auto;
            }
        }



    }

    .header {
        width: 100%;
        height: 170px;
        display: flex;
        align-items: center;
        gap: 1rem;


        img {
            user-select: none;

            width: 130px;
            height: 130px;
            border-radius: 50%;
        }

        .info {
            gap: .5rem;
            display: flex;
            flex-direction: column;

            span {
                color: var(--text-offset);
            }

            svg {
                color: var(--text-offset);
            }
        }
    }
}
</style>
  