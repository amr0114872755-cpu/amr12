import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroStaticConfig = {
  preset: "static",
  entry: "./scripts/nitro-static-entry.mjs",
  output: {
    dir: ".output",
    publicDir: ".output/public",
  },
} as unknown as {
  preset: string;
  output: {
    dir: string;
    publicDir: string;
  };
};

export default defineConfig({
  nitro: nitroStaticConfig,
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      maskPath: "/",
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@capacitor/core',
        '@capacitor/local-notifications',
        '@capacitor/app',
        '@capacitor/splash-screen',
        '@capacitor/browser',
        '@capacitor/filesystem',
        '@capacitor/app-launcher',
      ],
    },
  },
});
