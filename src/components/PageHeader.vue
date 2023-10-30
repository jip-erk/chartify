<template>
  <div class="header">
    <div class="left">
      <router-link to="/">
        <img src="@/assets/Logo.svg" class="logo" alt="logo">
      </router-link>
        <h1 class="nohover">Chartify</h1>
    </div>
    <div class="left">
      <router-link to="/lists"><button>List</button></router-link>
      <div class="dropdown">
        <div class="img-wrapper" :class="{ skeleton: loading }">
          <img @click.stop="menu = !menu" ref="button" class="profile" height="40" width="40" :src="store.user
            ? store.user.images[0].url
            : loginIcon
            " alt="profile" />
        </div>
        <Transition name="menu">

          <div ref="dropdown" v-if="menu" class="menu">
            <router-link to="/manage"><span @click="  menu = false;">
                <Icon icon="material-symbols:manage-accounts" />Manage
              </span></router-link>
            <span v-if="store.user" @click="() => {
              store.logout();
              menu = false;
            }
              ">
              <Icon icon="material-symbols:logout" />Logout
            </span>
            <span v-else @click="store.login">
              <Icon icon="material-symbols:person" /> Login
            </span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginIcon from '@/assets/loginicon.png';
import { Icon } from '@iconify/vue';
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "@/stores/auth";

const dropdown = ref();
const button = ref();

const loading = ref(false);

const store = useAuthStore();
const menu = ref(false);

onClickOutside(
  dropdown,
  () => {
    menu.value = !menu.value;
  },
  { ignore: [button] }
);
</script>

<style lang="scss" scoped>
img {
  -webkit-user-drag: none;
  cursor: pointer;
}

button {
  padding: 10px 30px;
  font-family: Inter;
  font-style: italic;
  font-weight: bold;
  transition-duration: 0.5s;
  background: none;
  border: none;
  text-align: right;
  display: flex;
  color: white;
  border-radius: 5px;
  font-size: 15px;
}

button:hover {
  background: #1494ff;
  cursor: pointer;
}

a:active {
  text-decoration: none;
  text-decoration-line: none;
}

.logo {
  height: 38px;
  width: 38px;
}

.profile {
  border-radius: 100%;
  outline: solid 2px var(--soft);
  outline-width: 0;
  transition: outline-width .15s ease-in-out;

  &:hover {
    outline-width: 3px;

  }
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  height: 100vh;
}

.menu {
  position: absolute;
  width: 170px;
  right: 0;
  margin-top: .5rem;
  // border: 1px solid #7AC2FF;
  backdrop-filter: blur(10px);
  background-color: var(--soft);
  border-radius: 4px;
  padding: .5rem;
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
    gap: .5rem;
    font-size: 1rem;
    background-color: var(--accent-light);

    // background: linear-gradient(220deg, #47FF6F 0%, #47ABFF 52.08%);
    transition: all .5s ease-in-out;

    &:hover {
      background: var(--accent);
      cursor: pointer;
    }
  }
}

h1 {
  color: #FFF;
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  font-style: light italic;
  font-weight: 300;
  line-height: normal;
}

.dropdown {
  position: relative;


  .skeleton::after {
    border-radius: 100% !important;
  }

  .img-wrapper {
    height: 40px;
    width: 40px;
  }
}

.header {
  // flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: .75rem 1.5rem;
  height: 70px;
  width: 100%;
  display: flex;

  .left {
    display: flex;
    gap: 1rem;
    padding: .75rem 1.5rem;

    align-items: center;
    position: relative;
    height: 80px;

  }
}

a {
  text-decoration: none;
  color: white;
}

.nohover {
  user-select: none;
  cursor: default;
}
</style>
