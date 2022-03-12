module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "google",
        "prettier",
        "plugin:@next/next/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint"
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
};
