<template>
  <div class="account-section">
    <div>
      <div class="card">
        <h2>Votre compte</h2>
        <form @submit.prevent="userStore.editUser">
          <div v-if="currentUser">
            <v-text-field
              v-model="currentUser.username"
              label="Nom d'utilisateur"
              variant="outlined"
              :error="error"
              :disabled="loading"
            ></v-text-field>
            <v-text-field
              v-model="currentUser.email"
              label="Email"
              variant="outlined"
              :error="error"
              :disabled="loading"
            ></v-text-field>
          </div>
          <v-btn type="submit" variant="text" :loading="loading">
            <span
              class="i-ph-caret-left-light"
              style="font-size: 0.8rem; margin-right: 0.2rem"
            ></span>
            Modifier
            <span
              class="i-ph-caret-right-light"
              style="font-size: 0.8rem; margin-left: 0.2rem"
            ></span
          ></v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, useUserStore } from '@/stores';
import { Ref } from 'vue';

const userStore = useUserStore();
const { error, loading, currentUser } = storeToRefs(userStore) as {
  error: Ref<boolean>;
  loading: Ref<boolean>;
  currentUser: Ref<User>;
};

userStore.getCurrentUser();
</script>

<style lang="scss" scoped>
h1 {
  color: whitesmoke;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  margin-bottom: -0.9rem;
}

.account-section {
  height: calc(100% - 56px);
  display: flex;
  background: whitesmoke;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

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

  form {
    display: flex;
    flex-direction: column;
    height: 100%;

    > div {
      margin-top: 2rem;
    }
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
