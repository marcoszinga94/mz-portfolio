import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

const tsFiles = ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"];

export default [
  {
    ignores: ["dist/", ".vercel/", "node_modules/", ".astro/"],
  },
  ...tseslint.configs.recommended.map((config) => {
    if (config.files) return config;
    return { ...config, files: tsFiles };
  }),
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    files: tsFiles,
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
