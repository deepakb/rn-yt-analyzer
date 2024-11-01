module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "nativewind/babel",
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      ["module-resolver", {
        root: ["./"],
        alias: {
          "@": "./src",
        },
      }],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};