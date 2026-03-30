import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Stub out Next.js server-only guard so we can import curriculum.ts in tests
      "server-only": path.resolve(__dirname, "src/__mocks__/server-only.ts"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
