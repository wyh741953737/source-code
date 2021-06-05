/**
 * native属性映射表
 *
 * 语法：
 * webKey: nativeKey
 *
 * 高级用法：
 *
 * webKey: {
 *  name: nativeKey,
 *  event: () => {}
 * }
 */

const basePropsMap = {
  id: 'nativeID',
  style: 'style',
  onClick: 'onPress',
  onBlur: 'onBlur',
  onFocus: 'onFocus',
  onLoad: 'onLoad',
  onError: 'onError',
};

const comPropsMap = {
  image: {
    src: (url) => [
      'source',
      {
        uri: url,
      },
    ],
  },
};

export default (type) => {
  if (!type) {
    return basePropsMap;
  }

  return {
    ...basePropsMap,
    ...comPropsMap[type],
  };
};
