import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

interface MyProxyOptions extends Options {
  onProxyReq?: (proxyReq: any, req: any, res: any) => void;
}

// Define the plugins array outside the server.proxy object
const plugins = [react()];

// Define the proxy config
const myProxyConfig: MyProxyOptions = {
  target: 'http://localhost:8080',
  changeOrigin: true,
  secure: false,
  onProxyReq(proxyReq, req, res) {
    // add custom headers or manipulate request body
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  server: {
    proxy: {
      '/api': myProxyConfig,
    },
  },
});
