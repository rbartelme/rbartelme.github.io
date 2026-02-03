import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";

export default [
  { ignores: [".next/**", "**/package-lock.json"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], ...js.configs.recommended, languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["scripts/**/*.mjs"], languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended,
  { files: ["**/*.{js,cjs}"], rules: { "@typescript-eslint/no-require-imports": "off" } },
  {
    files: ["**/*.{js,mjs,cjs,jsx,tsx,ts,mts,cts}"],
    plugins: { react: pluginReact },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", rules: json.configs.recommended.rules },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", rules: json.configs.recommended.rules },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", rules: json.configs.recommended.rules },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", rules: markdown.configs.recommended[0]?.rules },
];
