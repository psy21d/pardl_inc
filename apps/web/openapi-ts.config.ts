import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.yaml",
  output: "./api",
  plugins: ["@hey-api/client-fetch"],
});
