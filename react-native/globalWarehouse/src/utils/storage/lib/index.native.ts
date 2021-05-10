import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storageNative = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认7天（1000 * 3600 * 24 * 7 毫秒），设为null则永不过期
  // defaultExpires: 1000 * 3600 * 24 * 7,
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  sync: {
    async storage() {
      return {};
    },
  },
});

/**
 * 设置 storage
 * @params {String} key storage key值
 * @params  value storage value值
 * @example getStorage('name', 'test');
 */
const setStorage = async (key: string, data: object) => {
  const storageData = await storageNative.load({ key: 'storage' });

  storageNative.save({
    key: 'storage',
    data: { ...storageData, [key]: data },
  });
};

/**
 *  获取 storage
 * @params {String} key storage key值
 * @example getStorage('name');
 */
const getStorage = async (key: string) => {
  const storageData = await storageNative.load({ key: 'storage' });
  return storageData[key];
};

export { getStorage, setStorage };
