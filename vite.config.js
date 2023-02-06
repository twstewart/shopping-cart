import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname);
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        main: resolve(root, "store.html"),
        team: resolve(root, "team.html"),
      },
    },
  },
});
