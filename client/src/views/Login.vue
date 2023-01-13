<template>
  <div class="login-section">
    <div>
      <h1>Taco'Bout It</h1>
      <div class="card">
        <h2>Connexion</h2>
        <form @submit.prevent="handleLogin">
          <div>
            <v-text-field
              v-model="username"
              label="Nom d'utilisateur"
              variant="outlined"
              :error="error"
              :disabled="loading"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Mot de passe"
              variant="outlined"
              :error="error"
              :disabled="loading"
            ></v-text-field>
            <small
              >Pas encore de compte ?
              <a @click="$router.push('/register')">S'enregistrer</a></small
            >
          </div>
          <v-btn type="submit" variant="text">
            <span
              class="i-ph-caret-left-light"
              style="font-size: 0.8rem; margin-right: 0.2rem"
            ></span>
            Se connecter
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
import router from '@/router';
import { useUserStore } from '@/stores';

const username = ref('');
const password = ref('');

const userStore = useUserStore();
const { error, loading } = storeToRefs(userStore);

const handleLogin = async () => {
  if (username.value === '' || password.value === '') {
    return;
  }

  const body = {
    username: username.value,
    password: password.value,
  };

  await userStore.login(body);

  if (!error.value) {
    router.replace('/');
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: whitesmoke;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  margin-bottom: -0.9rem;
}

.login-section {
  height: 100%;
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
  height: 400px;
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
