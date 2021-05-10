import { getStorage, setStorage } from './lib';
import { STORAGE_KEY } from '../constant/base';

/**
 * 设置 token
 */
export async function setTokenStorage(value: string) {
  return setStorage(STORAGE_KEY.TOKEN, value);
}

/**
 *  获取 token
 */
export async function getTokenStorage() {
  return getStorage(STORAGE_KEY.TOKEN);
}
