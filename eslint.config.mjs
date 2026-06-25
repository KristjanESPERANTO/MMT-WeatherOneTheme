import js from "@eslint/js";

export default [
	{
		files: ["**/*.js", "**/*.mjs"],
		languageOptions: {
			ecmaVersion: "latest",
			globals : {
        console: "readonly",
        document: "readonly",
        module: "readonly",
        window: "readonly"
      }
		},
		rules: {
			...js.configs.recommended.rules,
			"no-unused-vars": ["error", {"argsIgnorePattern": "^_", "varsIgnorePattern": "^_"}],
			"prefer-const": "error"
		}
	}
];
