const { platform } = process.env;

// app 端配置
const appConfig = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['import', { libraryName: '@ant-design/react-native' }],
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '@/',
      },
    ],
  ],
};

// web 端配置
const webConfig = {};

module.exports = platform === 'web' ? webConfig : appConfig;
