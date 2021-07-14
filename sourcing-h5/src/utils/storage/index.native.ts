import {load, save} from './config';
import {STORAGE_KEY} from '../constant/base';

/**
 * 设置 token
 */
export async function setTokenStorage(value: string) {
  return save('userInfo', {[STORAGE_KEY.TOKEN]: value});
}

/**
 *  获取 token
 */
export async function getTokenStorage() {
  const res: any = await load({key: 'userInfo'});
  return res[STORAGE_KEY.TOKEN];
}
