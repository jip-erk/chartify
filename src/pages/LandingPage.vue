<template>
    <div>
        <h1>Chartify</h1>
        <p>A website where you can find all the statistics you’d like about your Spotify account. Please log-in to get
            started!</p>
        <button @click="() => store.user ?  router.push('/lists') : store.login()">Get Started</button>
    </div>
</template>
  
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

</script>
  
<style scoped>
H1 {
    margin-top: 10rem;
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 40px;
    font-style: light italic;
    font-weight: 300;
    line-height: normal;
}

p {
    margin: 3rem 0;
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 40px;
    font-style: italic;
    font-weight: 300;
    line-height: normal;
    font-size: 20px;
}

button {
    border: 3px solid #7AC2FF;
    background: none;
    font-family: Inter;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin-left: 45.5%;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
    transition-duration: 0.5s;
}

button:hover {
    background: #7AC2FF;
}
</style>