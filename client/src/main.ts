import { createApp } from 'vue';
import rootApp from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'uno.css';

const app = createApp(rootApp);
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount('#app');
