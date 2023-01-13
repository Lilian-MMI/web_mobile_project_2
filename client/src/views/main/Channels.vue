<template>
  <div class="channels-section">
    <div v-for="channel in channels" :key="channel.id" class="card">
      <h2>{{ channel.name }}</h2>
      <v-btn
        type="submit"
        variant="text"
        @click="$router.push('/channels/' + channel.id)"
      >
        <span
          class="i-ph-caret-left-light"
          style="font-size: 0.8rem; margin-right: 0.2rem"
        ></span>
        Rejoindre
        <span
          class="i-ph-caret-right-light"
          style="font-size: 0.8rem; margin-left: 0.2rem"
        ></span
      ></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getChannels } from '@/api/channel';

import { useSocketIO } from '@/composables/use-socket-io';
const { socket } = useSocketIO();

const channels = ref([]) as any;

socket.on('newChannel', async () => {
  channels.value = await getChannels();
});

onMounted(async () => {
  channels.value = await getChannels();
});
</script>

<style lang="scss" scoped>
h1 {
  color: whitesmoke;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  margin-bottom: -0.9rem;
}

.channels-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  background: whitesmoke;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

.card {
  width: 100%;
  max-width: 600px;
  margin: auto;
  border-radius: 6px;
  border: 1px solid #333;
  position: relative;
  z-index: 2;
  background: whitesmoke;
  transform-style: preserve-3d;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px dashed #333;
    border-radius: 6px;
    top: 12px;
    left: 12px;
    transform: translateZ(-1px);
    z-index: 1;
  }

  button {
    margin-top: auto;
  }

  small a {
    color: #333;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
