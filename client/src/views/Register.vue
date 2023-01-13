<template>
  <div class="register-section">
    <div>
      <h1>Taco'Bout It</h1>
      <div class="card">
        <h2>Inscription</h2>
        <form @submit.prevent="handleRegister">
          <div>
            <v-text-field
              label="Pseudo"
              variant="outlined"
              v-model="username"
              :error="!!errors.username"
              :error-messages="errors.username"
            ></v-text-field>
            <v-text-field
              label="Email"
              variant="outlined"
              v-model="email"
              :error="!!errors.email"
              :error-messages="errors.email"
            ></v-text-field>
            <v-text-field
              label="Mot de passe"
              variant="outlined"
              type="password"
              v-model="password"
              :error="!!errors.password"
              :error-messages="errors.password"
            ></v-text-field>
            <v-text-field
              label="Mot de passe ²"
              variant="outlined"
              type="password"
              v-model="confirmPassword"
              :error="!!errors.confirmPassword"
              :error-messages="errors.confirmPassword"
            ></v-text-field>
            <small
              >Déjà un compte ?
              <a @click="$router.push('/login')">Se connecter</a></small
            >
          </div>
          <v-btn type="submit" variant="text">
            <span
              class="i-ph-caret-left-light"
              style="font-size: 0.8rem; margin-right: 0.2rem"
            ></span>
            S'enregistrer
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
import { registerUser } from '@/api/user';
import router from '@/router';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref<{ [key: string]: string }>({});

type ErrorServer = {
  property: string;
  constraints: {
    [key: string]: string;
  };
};

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errors.value = {
      confirmPassword: 'Password does not match',
    };
  }

  registerUser({
    username: username.value,
    email: email.value,
    password: password.value,
  })
    .then(() => {
      router.push('/login');
    })
    .catch(async ({ response }) => {
      const errorsServer = (await response.json()) as ErrorServer[];

      errors.value = errorsServer.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints)[0];
        return acc;
      }, {} as { [key: string]: string });
    });
};
</script>

<style lang="scss" scoped>
h1 {
  color: whitesmoke;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  margin-bottom: -0.9rem;
}

.register-section {
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
  min-height: 520px;
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

<style lang="scss">
div.v-input__details {
  padding: 0 !important;

  .v-messages__message {
    margin: 0.5rem 0;
  }
}
</style>
