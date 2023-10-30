<template>
    <div class="container">
        <div class="back"></div>
            <img :src="store.user.images[1].url">
            <h1 v-if="store.user">Welcome Back, {{ store.user.display_name }}.</h1>
    </div>

    <div class="container-info">
        <div class="container-text"><div class="icon"><Icon icon="material-symbols:privacy-tip"/></div><h2>Privacy Policy</h2>
            <p>See how we use your data, to provide you with our service.</p>
            <button>Go</button>
            <hr>
        </div>
    </div>
   

    <div class="container-info">
        <div class="container-text"><div class="icon"><Icon icon="dashicons:admin-generic"/></div><h2>Account Settings</h2>
            <p>Manage your Spotify account.</p>
            <a target=_blank href="https://www.spotify.com/us/account/apps/"><button>Go</button></a>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Icon } from '@iconify/vue';
    import { useAuthStore } from "@/stores/auth";
    const store = useAuthStore();
</script>

<style scoped>
.container {
    margin-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.container-info {
    margin-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
}

.container-text {
    align-items: center;
    flex-direction: column;
    width: 40%;
    text-align: center;
}

hr {
    margin-top: 15px;
}

h1 {
    color: #FFF;
    font-family: Inter;
    font-size: 40px;
    font-style: italic;
    font-weight: 300;
    line-height: normal;
}

h2 {
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 30px;
    font-style: italic;
    font-weight: 300;
    line-height: normal;
    width: 100%;
}

img {
    border-radius: 50%;
    width: 150px;
    display: flex;
    left: 0;
}

p {
    color: #FFF;
    font-family: Inter;
    font-size: 40px;
    font-style: italic;
    font-weight: 300;
    line-height: normal;
    font-size: 20px;
} 

.icon {
    font-size: 40px;
    margin-right: 10px;
}

.container-info button {
    background: #1494ff;
    border: none;
    font-family: Inter;
    font-size: 20px;
    color: #ffffff;
    padding: 5px;
    margin: 10px 0;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
}
</style>