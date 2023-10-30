import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref();
  const clientId = "803892967a7f4bbcb137cbcd87dc78dd";
  const redirectUri =
    "https://graceful-buttercream-6c6054.netlify.app/redirect";

  onMounted(async () => {
    await getProfile();
    const following = localStorage.getItem("following");
    if (following !== "1") followMe();
  });

  async function getProfile() {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.status === 401) {
        await refresh();
      } else {
        user.value = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function refresh() {
    let refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return;
    let body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
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

      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const login = () => {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope =
        "user-read-private user-read-email user-top-read user-follow-modify user-follow-read user-read-recently-played";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location.href = "https://accounts.spotify.com/authorize?" + args;
    });
  };

  const followMe = async () => {
    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    try {
      const response = await axios.put(
        "https://api.spotify.com/v1/me/following?type=user",
        { ids: ["jip.erkelens", "unkj5z53ehfe76q1djcq6q40d"] },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      localStorage.setItem("following", "1");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    user.value = "";
    router.push("/");
  };

  const generateRandomString = (length: number): string => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  async function generateCodeChallenge(codeVerifier: string) {
    function base64encode(array: number[]) {
      return btoa(String.fromCharCode.apply(null, array))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    const digestArray = Array.from(new Uint8Array(digest));

    return base64encode(digestArray);
  }

  return { user, login, logout, refresh, getProfile };
});
