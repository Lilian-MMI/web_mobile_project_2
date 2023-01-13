import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  strategies: 'injectManifest',
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    start_url: '/index.html',
    scope: '/',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'img/icons/android-chrome-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'img/icons/android-chrome-192x192.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'img/icons/android-chrome-192x192.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
  injectManifest: {
    maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
  },
  srcDir: 'src',
  filename: 'sw.js',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaOptions),

    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    AutoImport({
      dts: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Unocss({
      presets: [
        presetIcons({
          prefix: 'i-',
          scale: 1.5,
          extraProperties: {
            display: 'inline-block',
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 3000,
  },
});
