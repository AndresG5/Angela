import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // Plugins necesarios para React y TailwindCSS
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Alias @ para la carpeta src
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Archivos que se pueden importar como raw (SVG, CSV)
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    host: true,          // Permite que otros dispositivos accedan
    port: 5173,          // Puerto que uses en tu app
    strictPort: false,   // Si el puerto está ocupado, Vite elegirá otro automáticamente
    allowedHosts: true,  // ✅ Permite cualquier host externo, incluido ngrok
  },

  // Evita advertencias de consola por HMR al usar ngrok
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 5173,
  },
})