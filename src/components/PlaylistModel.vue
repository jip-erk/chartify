<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <h1>Create playlist
          <button class="modal-default-button" @click="emit('close')">
            <Icon icon="mdi:close" />
          </button>
        </h1>
        <div class="modal-body">
          <h3>{{ getPeriod(store.period) }}</h3>
        </div>
      </div>
      <div class="outside" @click="emit('close')" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useTopStore } from '@/stores/tracks';

const store = useTopStore();

const emit = defineEmits<{
  (e: 'close'): void
}>()

const getPeriod = (period: string) => {
  switch (period) {
    case 'short_term':
      return '4 weeks';
    case 'medium_term':
      return '6 months';
    case 'long_term':
      return 'lifetime';
    default:
      return '4 weeks';
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  .outside {
    position: fixed;
    height: 100vh;
    width: 100%;
  }
}

h1 {
  text-align: center;
}

.modal-container {
  width: 700px;
  margin: auto;
  padding: 20px 30px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  z-index: 11;

  h1 {
    display: flex;
    justify-content: space-between;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: black;
}

.modal-body {
  margin: 20px 0;

  .selector {
    width: 100%;
    display: flex;

    span {
      flex: 1;
      justify-content: center;
      padding: .5rem 0;
      display: flex;
    }
  }
}

.modal-default-button {
  float: right;
  display: flex;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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