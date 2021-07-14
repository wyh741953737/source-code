import Dexie, { Table } from 'dexie';
import { Base64 } from 'js-base64';
// 是否开启加密
const encrypt: boolean = false;
const encryptor = {
  encode: (value: string): any => {
    if (!encrypt) return value;
    return Base64.encode(value);
  },
  decode: (value: string): any => {
    if (!encrypt) return value;
    return Base64.decode(value);
  },
};

/**
 * 本地缓存方法封装了window.localStorage和window.sessionStorage
 */
export default {
  /**
   * 封装了window.localStorage.setItem，增加了一个特性：被赋值的值可以使jsonObject类型
   * @param {string} key 键名
   * @param {any} value 值，可以是json object类型
   */
  localSet(key: string, value: any) {
    if (typeof value == 'object') value = JSON.stringify(value);
    value = encryptor.encode(value);
    window.localStorage.setItem(key, value);
  },
  /**
   * 封装了window.localStorage.getItem,增加一个特性：根据key可以直接获取到jsonObject类型的value值
   * @param {string} key 键名
   */
  localGet(key: string) {
    let value = window.localStorage.getItem(key);
    if (!value) return;
    value = encryptor.decode(value);
    try {
      value = JSON.parse(value as string);
    } catch (e) {}
    return value as any;
  },
  /**
   * 封装了window.localStorage.removeItem
   * @param {string} key 键名
   */
  localRemove(key: string) {
    window.localStorage.removeItem(key);
  },
  /**
   * 封装了window.localStorage.kclear
   */
  localClear() {
    window.localStorage.clear();
  },
  /**
   * 添加sessionStorage
   * @param key
   * @param value
   */
  sessionSet(key: string, value: any) {
    if (typeof value == 'object') value = JSON.stringify(value);
    value = encryptor.encode(value);
    window.sessionStorage.setItem(key, value);
  },
  /**
   * 获取sessionStorage
   * @param key
   * @returns {string}
   */
  sessionGet(key: string) {
    let value = window.sessionStorage.getItem(key);
    if (!value) return;
    value = encryptor.decode(value);
    try {
      value = JSON.parse(value as string);
    } catch (e) {}
    return value as any;
  },
  /**
   * 删除sessionStorage
   * @param key
   */
  sessionRemove(key: string) {
    window.sessionStorage.removeItem(key);
  },
  /**
   * 清除所有sessionStorage
   */
  sessionClear() {
    window.sessionStorage.clear();
  },
  /**
   * 下面四个方法是IndexDB存储，优点是可以存储大量数据，一般都不会受到大小限制
   * 但是注意方法都是异步的，如果有同步的逻辑需要进行等待
   * @param key
   * @param value
   */
  dbSet(key: string, value: any) {
    return DBStore.set(key, value);
  },
  dbGet(key: string) {
    return DBStore.get(key);
  },
  dbRemove(key: string) {
    return DBStore.del(key);
  },
  dbClear() {
    return DBStore.clear();
  },
};

class DBBase {
  DB: Dexie | null = null;
  DBName: string = '';

  constructor(id: string) {
    this.DBName = `storage-${id}`;
    this.createOpenLocalDB();
  }

  createOpenLocalDB() {
    this.DB = new Dexie(this.DBName, { autoOpen: true });
    this.DB.version(1).stores({
      base: '&key,value,updateTime',
    });
  }

  deleteDB = () => {
    return this.DB?.delete();
  };

  set = (key: string, value: any) => {
    return this.DB?.table('base').put({ key, value, updateTime: Date.now() });
  };

  get = async (key: string) => {
    const c = await this.DB?.table('base').get(key);
    if (!c) return;
    return c.value;
  };

  del = (key: string) => {
    return this.DB?.table('base').delete(key);
  };

  clear = async () => {
    await this.DB?.table('base').clear();
  };
}

const DBStore = new DBBase('warehouse');
