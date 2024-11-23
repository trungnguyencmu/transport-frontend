import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import Colors from './src/constants/Colors';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': Colors.primary,
          '@link-color': Colors.secondary,
          '@success-color': Colors.active,
          '@warning-color': Colors.tertiary,
          '@error-color': Colors.danger,
          '@text-color': Colors.primaryText,
          '@text-color-secondary': Colors.gray,
          '@background-color-base': Colors.background,
          '@input-bg': Colors.input,
          '@border-color-base': Colors.separator,
        },
      },
    },
  },
  server: {
    port: 3001, // Set the port to 3000
    open: true, // Automatically open the browser
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Base alias for src directory
      components: path.resolve(__dirname, './src/components'),
      constants: path.resolve(__dirname, './src/constants'),
      pages: path.resolve(__dirname, './src/pages'),
      forms: path.resolve(__dirname, './src/components/forms'),
      services: path.resolve(__dirname, './src/services'),
    },
  },
});
