export const isReactNative = () => {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    require("react-native");
    return true;
  } catch (e) {
    return false;
  }
};
