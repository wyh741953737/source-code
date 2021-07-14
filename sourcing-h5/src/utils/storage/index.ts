import storage from 'good-storage';
import {STORAGE_KEY} from '../constant/base';

/**
 * 设置 token
 */
export function setTokenStorage(value: string) {
  return storage.set(STORAGE_KEY.TOKEN, value);
}

/**
 *  获取 token
 */
export function getTokenStorage(): string {
  return storage.get(STORAGE_KEY.TOKEN, '');
}
