<template>
  <v-app-bar>
    <div class="logo-section" @click="$router.push('/')">
      <h1>Taco'Bout It</h1>
    </div>
  </v-app-bar>

  <v-main>
    <div
      style="
        background: whitesmoke;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
      "
    >
      <v-btn variant="text" style="margin: 0.5rem 0" @click="$router.go(-1)">
        <span class="i-ph-arrow-left-thin"></span>
        RETOUR
      </v-btn>
      <v-divider style="width: 100%; margin-bottom: 1rem"></v-divider>
      <router-view></router-view>
    </div>
  </v-main>

  <v-bottom-navigation grow v-if="!isChatActive">
    <v-btn @click="$router.push('/me')">
      <span class="i-ph-user-circle-thin"></span>
    </v-btn>

    <v-btn @click="isAddChannelDialogActive = true">
      <span class="i-ph-plus-circle-fill main-link"></span>
    </v-btn>

    <v-btn @click="$router.push('/channels')">
      <span class="i-ph:chats-thin"></span>
    </v-btn>
  </v-bottom-navigation>

  <v-dialog v-model="isAddChannelDialogActive" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Créer un salon
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newChannelName"
            label="Nom du salon"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="isAddChannelDialogActive = false">Annuler</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="handleAddChannel"> Ajouter </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { channelApi } from '@/api';
import { useSocketIO } from '@/composables/use-socket-io';
const { socket } = useSocketIO();

const routes = useRoute();
const isChatActive = ref(false);

watch(
  () => routes.name,
  () => {
    isChatActive.value = routes.name === 'channel';
  },
  { immediate: true }
);

const isAddChannelDialogActive = ref(false);
const newChannelName = ref('');

const handleAddChannel = async () => {
  if (newChannelName.value === '') {
    return;
  }

  const body = {
    name: newChannelName.value,
  };

  await channelApi.addChannel(body);
  socket.emit('channelAdded');

  isAddChannelDialogActive.value = false;
};
</script>

<style lang="scss" scoped>
h1 {
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  font-size: 2rem;
}

span {
  font-size: 1rem;

  &.main-link {
    font-size: 1.5rem;
  }
}

.logo-section {
  display: flex;
  align-items: center;
  margin-left: 1rem;

  > span {
    margin-right: 0.5rem;
  }
}
</style>
