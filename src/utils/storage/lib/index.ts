import storage from 'good-storage';

/**
 * 设置 storage
 * @params {String} key storage key值
 * @params  value storage value值
 * @example getStorage('name', 'test);
 */
export async function setStorage(key: string, value: any) {
  return storage.set(key, value);
}

/**
 *  获取 storage
 * @params {String} key storage key值
 * @example getStorage('name');
 */
export async function getStorage(key: string) {
  return storage.get(key);
}
