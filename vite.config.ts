import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv('mock', process.cwd(), '');
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      console.log(key, val);
      return {
        ...prev,
        [key]: val
      };
    }, {})
  };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // for TypeScript path alias import like : @/x/y/z
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: processEnvValues
  };
});
