// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 تأكد أن هذا هو اسم المستودع
export default defineConfig({
  base: '/eclweb/',
  plugins: [react()],
});
