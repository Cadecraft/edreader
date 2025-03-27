import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default (mode: string) => { // { mode }
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react()],
    server: {
      cors: {
        origin: process.env.VITE_SERVER_URL
      },
      proxy: {
        // String shorthand:
        // http://localhost:5173/foo
        //   -> http://localhost:4567/foo
        '/api': {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  });
}
