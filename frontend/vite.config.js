import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [
    react({
      jsxRuntime: 'automatic', // 👈 tell Vite/Babel to use new JSX runtime
    }),
  ],
});

