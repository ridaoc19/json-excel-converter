module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:prettier/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', 'vite.config.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.eslint.json',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-console': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-non-null-assertion': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'import/prefer-default-export': 'off',
		'consistent-return': 'error',
		'no-underscore-dangle': ['error', { allowAfterThis: true }],
		// 'max-len': ['error', { code: 100, ignoreComments: true }],
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				assert: 'htmlFor',
			},
		],
	},
};
