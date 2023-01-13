<template>
  <v-main class="chat">
    <div
      :style="`
        overflow-x: scroll;
        white-space: nowrap;
        height: calc(100vh - 180px);
        display: flex;
        flex-direction: column-reverse;`"
    >
      <div class="wrapper">
        <div
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          style="overflow: scroll"
        >
          <div>
            <div
              class="chat-message"
              :class="{
                'chat-message--right': chatMessage.User.id === currentUser!.id,
                'chat-message--info': chatMessage.type === 'info',
              }"
            >
              <div>
                <div
                  class="chat-message-username"
                  v-if="chatMessage.type !== 'info'"
                >
                  {{ chatMessage.User.username }}
                </div>
                <div
                  class="chat-message-content"
                  v-if="chatMessage.type === 'text'"
                >
                  {{ chatMessage.content }}
                </div>
                <div
                  class="chat-message-content"
                  v-if="chatMessage.type === 'gif'"
                  v-html="chatMessage.content"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
  <div class="chat-input">
    <discord-picker
      input
      :value="message"
      gif-format="html"
      @update:value="message = $event"
      @keydown.enter="sendMessage"
      api-key="85LY8DY0JV3Q"
      @gif="setGif"
      placeholder="Envoyer un message"
    />
    <!-- send icon -->
    <span
      class="i-ph-paper-plane-tilt"
      style="font-size: 1.5rem; margin: 0 0.75rem 0 1rem; cursor: pointer"
      @click="sendMessage"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { useSocketIO } from '@/composables/use-socket-io';
import { chatApi } from '@/api/index';
import { useUserStore } from '@/stores';
//@ts-expect-error (no types)
import DiscordPicker from 'vue3-discordpicker';

interface User {
  id: string;
  username: string;
  email: string;
}

const { currentUser } = useUserStore();

const { channelId } = useRoute().params as { channelId: string };
const { socket } = useSocketIO();

const setGif = (gif: string) => {
  socket.emit('addMessage', {
    channelId,
    message: gif,
    type: 'gif',
    user: currentUser!,
  });

  chatApi.postMessage(channelId, {
    content: gif,
    type: 'gif',
  });
};

const message = ref('');
const chatMessages = ref<(Message & { User: User })[]>([]);

type Message = {
  id: string;
  content: string;
  type: string;
};

onMounted(async () => {
  window.addEventListener('beforeunload', handlerExitWindow);

  const messages = (await chatApi.getMessagesByChannel(
    channelId
  )) as (Message & { User: User })[];
  chatMessages.value = messages;
});

const sendMessage = async () => {
  if (message.value === '') return;

  socket.emit('addMessage', {
    channelId,
    message: message.value,
    type: 'text',
    user: currentUser!,
  });

  await chatApi.postMessage(channelId, {
    content: message.value,
    type: 'text',
  });

  message.value = '';
};

socket.emit('joinChannel', {
  channelId,
  socketId: socket.id,
  user: currentUser!,
});

socket.on('newMessage', (data) => {
  chatMessages.value.push({
    content: data.message,
    id: new Date().toISOString(),
    type: data.type,
    User: data.user,
  });
});

socket.on('userJoined', (data) => {
  chatMessages.value.push({
    content: `${data.user.username} a rejoint le salon`,
    id: new Date().toISOString(),
    type: 'info',
    User: data.user,
  });
});

socket.on('userLeft', (data) => {
  chatMessages.value.push({
    content: `${data.user.username} a quitté le salon`,
    id: new Date().toISOString(),
    type: 'info',
    User: data.user,
  });
});

onBeforeUnmount(() => handlerExitWindow);

function handlerExitWindow() {
  socket.emit('userQuit', {
    channelId,
    socketId: socket.id,
    user: currentUser!,
  });
}
</script>

<style lang="scss" scoped>
.chat-input {
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 0.5rem;
  box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));

  span {
    font-size: 1.3rem;
    display: flex;
    place-self: center;
    margin: 0 1rem;
  }
}

.chat {
  width: 100%;
  margin-top: -5rem;

  .wrapper {
    white-space: normal;
    width: 100%;
    padding: 1rem;
  }
}

.chat-message {
  display: flex;
  width: 100%;

  &--right {
    color: black;
    display: flex;
    justify-content: flex-end;

    .chat-message-username {
      text-align: right;
    }

    .chat-message-content {
      background: #81b7f4;
      margin: 0.2rem 0 1rem auto;
    }
  }

  &--info {
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
    margin: 0.5rem 0;

    .chat-message-content {
      color: black;
      background: none;
      margin: 0;
    }
  }

  &-username {
    font-weight: bold;
  }

  &-content {
    background: #e6e6e6;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    margin: 0.2rem 0 1rem 0;
    color: white;
    width: fit-content;
  }
}
</style>

<style>
.emojibutton__active {
  border-radius: 0 !important;
}

.vue3-emojipicker .mt-4 {
  margin-top: 0 !important;
}

.vue3-discord-emojipicker__input::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: white !important;
}

.vue3-discord-emojipicker__emojibutton {
  width: 35px !important;
}
</style>
