import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,

  {
    plugins: {
      import: importPlugin,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
      
      },
    },
    
    rules: {
      ...importPlugin.configs.recommended.rules,
     
    },
  },
];
