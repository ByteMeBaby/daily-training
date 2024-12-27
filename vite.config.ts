import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import "vitest/config";
import { defineConfig as defineVitestConfig } from "vitest/config";

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react()],
});

export default mergeConfig(config, vitestConfig);
