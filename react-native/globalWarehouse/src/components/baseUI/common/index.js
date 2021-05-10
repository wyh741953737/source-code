import getPropsMap from './propsMap';

/**
 * 将props中的属性映射到native相对应的属性
 *
 * @param {Object} props
 */
const propsToNativeProps = (props, type) => {
  const nativeProps = {};
  const propsMap = getPropsMap(type);

  for (const prop of Object.keys(props)) {
    const nativePropName = propsMap[prop];
    const propValue = props[prop];

    if (nativePropName) {
      if (typeof nativePropName === 'object') {
        nativeProps[nativePropName.name] = nativePropName.event;
        continue;
      }

      if (typeof nativePropName === 'function') {
        const [name, value] = nativePropName(propValue);

        nativeProps[name] = value;
        continue;
      }

      nativeProps[nativePropName] = propValue;
      continue;
    }

    nativeProps[prop] = propValue;
  }

  return nativeProps;
};

/**
 * 将props转换成native支持的属性，并返回event对象和非event属性
 *
 * @param {Object} props
 */
export const parseProps = (props, type) => {
  props = propsToNativeProps(props, type);

  const event = {};
  const attr = {};

  for (const prop of Object.keys(props)) {
    if (prop.indexOf('on') === 0) {
      event[prop] = props[prop];
      continue;
    }

    attr[prop] = props[prop];
  }

  return {
    event,
    attr,
  };
};
