import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST || '0.0.0.0', // 0.0.0.0: Enables access via localhost and 127.0.0.1
      port: Number(env.VITE_PORT) || 8083,
    },
  };
});
