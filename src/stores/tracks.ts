import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import type {
  SpotifyArtist,
  SpotifyTrack,
  Popularity,
  SpotifyRecentTrack,
} from "@/models/top";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const useTopStore = defineStore("top", () => {
  const topTracks = ref<SpotifyTrack[]>([]);
  const topArtist = ref<SpotifyArtist[]>([]);
  const topGenres = ref<Popularity[]>([]);
  const recentPlays = ref<SpotifyRecentTrack[]>([]);
  const period = ref<string>("short_term");
  const loading = ref<boolean>(true);
  const route = useRoute();

  const store = useAuthStore();

  const fetchTopTracks = async () => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${period.value}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      // if (response.status === 401) {
      //   await store.refresh();
      // }

      topTracks.value = response.data.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchRecentlyPlayed = async () => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      recentPlays.value = response.data.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchTopArtists = async () => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${period.value}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      topArtist.value = response.data.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchTopGenres = async () => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    loading.value = true;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${period.value}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      const items: SpotifyArtist[] = response.data.items;

      const popularityMap = new Map();

      items.forEach((item) => {
        const genres = item.genres;
        genres.forEach((genre) => {
          if (popularityMap.has(genre)) {
            popularityMap.set(genre, popularityMap.get(genre) + 1);
          } else {
            popularityMap.set(genre, 0);
          }
        });
      });

      const popularity: Popularity[] = Array.from(
        popularityMap,
        ([name, total]) => ({ name, total })
      );
      const filteredPopularity = popularity.filter((entry) => entry.total > 0);

      const maxTotal = Math.max(
        ...filteredPopularity.map((entry) => entry.total)
      );

      filteredPopularity.forEach((entry) => {
        entry.total = Math.ceil((entry.total / maxTotal) * 100);
      });
      filteredPopularity.sort((a, b) => b.total - a.total);

      topGenres.value = filteredPopularity;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => [period.value, route.query.top],
    () => {
      switch (route.query.top) {
        case "tracks":
          fetchTopTracks();
          break;
        case "artists":
          fetchTopArtists();
          break;
        case "genres":
          fetchTopGenres();
          break;
        case "recent":
          fetchRecentlyPlayed();
          break;
        default:
          fetchTopTracks();
          break;
      }
    },
    { immediate: true }
  );

  return {
    period,
    topTracks,
    topGenres,
    loading,
    recentPlays,
    topArtist,
    fetchTopTracks,
    fetchTopArtists,
    fetchTopGenres,
    fetchRecentlyPlayed,
  };
});
