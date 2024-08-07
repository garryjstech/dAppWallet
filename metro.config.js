// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;




// const { getDefaultConfig } = require('expo/metro-config');


// module.exports = (async () => {
//     const { resolver: { sourceExts, assetExts } } = await getDefaultConfig();

//     return {
//         transformer: {
//             babelTransformerPath: require.resolve('react-native-sass-transformer')
//         },
//         resolver: {
//             sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx', 'json'],
//             extraNodeModules: require('node-libs-react-native')
//         }
//     };
// })();