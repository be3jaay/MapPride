import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      laravel({
        input: ['resources/js/app.jsx'],
        refresh: true,
      }),
    ],
    // Vite automatically loads env variables prefixed with VITE_
    // so we don't need to explicitly define them here
  };
});
