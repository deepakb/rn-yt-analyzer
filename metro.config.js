const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = config.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const updatedConfig = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    ...config.resolver,
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
};

module.exports = withNativeWind(updatedConfig, { input: './global.css' });