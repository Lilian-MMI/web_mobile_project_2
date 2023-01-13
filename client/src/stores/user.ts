import { editUser, getCurrentUser, loginUser, UserLoginDto } from '@/api/user';

export interface User {
  id: string;
  username: string;
  email: string;
}

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: false,
  }),

  getters: {},

  actions: {
    async login({ username, password }: UserLoginDto) {
      this.loading = true;
      this.error = false;

      const { token, user } = (await loginUser({
        username,
        password,
      }).catch(() => {
        this.error = true;
        this.loading = false;
      })) as { token: string; user: User };

      if (!token) {
        return;
      }

      localStorage.setItem('token', token);
      this.currentUser = user;
      this.loading = false;
      this.error = false;
    },

    async logout() {
      localStorage.removeItem('token');
      this.currentUser = null;
    },

    async getCurrentUser() {
      this.loading = true;
      this.error = false;

      const user = (await getCurrentUser().catch(() => {
        this.error = true;
        this.loading = false;
      })) as User;

      if (!user) {
        return;
      }

      this.currentUser = user;
      this.loading = false;
      this.error = false;
    },

    async editUser() {
      this.loading = true;
      this.error = false;

      const user = (await editUser({
        email: this.currentUser!.email,
        username: this.currentUser!.username,
      }).catch(() => {
        this.error = true;
        this.loading = false;
      })) as User;

      if (!user) {
        return;
      }

      this.currentUser = { ...this.currentUser, ...user };
      this.loading = false;
      this.error = false;
    },
  },
});
