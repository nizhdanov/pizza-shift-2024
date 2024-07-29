import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@icons': path.resolve(__dirname, './src/components/icons'),
      '@utils': path.resolve(__dirname, './src/lib/utils'),
      '@hooks': path.resolve(__dirname, './src/lib/hooks'),
      '@modules': path.resolve(__dirname, './src/lib/modules'),
      '@constants': path.resolve(__dirname, './src/lib/constants')
    }
  },
  envPrefix: ['VITE_', 'DADATA_', 'BASE_']
});
