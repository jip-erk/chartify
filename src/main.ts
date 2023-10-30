import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import index from "@/pages/index.vue";
import LandingPage from "@/pages/LandingPage.vue";
import TopLists from "@/pages/TopLists.vue";
import Artist from "@/pages/Artist.vue";
import manage from "./pages/manage.vue";
import { useAuthStore } from "@/stores/auth";
import playlist from "@/pages/playlist.vue";

import axios from "axios";
import App from "./App.vue";

const redirecting = {
  template: "<div>redirecting</div>",
};
const redirectUri = "https://graceful-buttercream-6c6054.netlify.app/redirect";
const clientId = "803892967a7f4bbcb137cbcd87dc78dd";

const routes = [
  { path: "/manage", component: manage },
  {
    path: "/",
    component: LandingPage,
  },
  { path: "/welcome", component: index },
  { path: "/lists", component: TopLists },
  { path: "/playlist", component: playlist },

  { path: "/artist/:id", component: Artist },

  {
    path: "/redirect",
    component: redirecting,
    beforeEnter: async (to: any, _from: any, next: any) => {
      let codeCookie = localStorage.getItem("code_verifier");
      const userStore = useAuthStore();

      if (!codeCookie) {
        next("/error");
        return;
      }

      let body = new URLSearchParams({
        grant_type: "authorization_code",
        code: to.query.code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeCookie,
      });

      try {
        const data = await axios.post(
          "https://accounts.spotify.com/api/token",
          body,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (!data.data.access_token || !data.data.refresh_token) return;
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
      } catch (err) {
        console.log(err);
      }
      userStore.getProfile();
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

import "./assets/main.css";
import PlaylistModelVue from "./components/PlaylistModel.vue";
import ArtistVue from "./components/Artist.vue";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
