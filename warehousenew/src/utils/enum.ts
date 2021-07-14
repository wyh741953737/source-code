export interface EnumItem {
  key: string | number;
  value: string;
  [name: string]: any;
}
export type EnumValue = [string, EnumItem];
export default class Enum {
  private _enum: Map<any, EnumItem>;
  private _keyMap: Map<any, EnumItem>;
  private _valueMap: Map<any, EnumItem>;

  constructor(args: Array<EnumValue>) {
    // @ts-ignore
    this._enum = new Map(CheckKeys(args));
    this._keyMap = new Map();
    this._valueMap = new Map();
    for (let key of this._enum.keys()) {
      const val = this._enum.get(key) as EnumItem;
      this._keyMap.set(val.key, val);
      this._valueMap.set(val.value, val);
      if (enumKeys.includes(key)) {
        throw new Error(`Enum key can not include ${enumKeys.join(',')}.`);
      }
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get: () => val,
      });
    }
  }

  /**
   * 遍历枚举，ENUM.map((item, key)=> (<option key={key}>{item.value}</option>)})
   * @param callback 枚举节点回调
   * @param filter 过滤函数，根据枚举属性可以过滤掉一些枚举
   */
  map<T>(
    callback: (item: EnumItem, key: any) => T,
    filter?: (item: EnumItem) => boolean,
  ) {
    const temp = [];
    for (let key of this._enum.keys()) {
      const item = this._enum.get(key) as EnumItem;
      const flag = filter && filter(item);
      if (!filter || flag) temp.push(callback(item, key));
    }
    return temp;
  }

  /**
   * 输出数组格式
   */
  toArray() {
    return this.map(i => i);
  }

  /**
   * 根据key找到对应枚举节点，返回对应的EnumItem
   * @param key
   */
  key(key: any) {
    return this._keyMap.get(key);
  }

  /**
   * 根据value找到对应枚举节点，返回对应的EnumItem
   * @param value
   */
  value(value: any) {
    return this._valueMap.get(value);
  }

  /**
   * 判断是否存在key，返回boolean
   * @param key
   */
  has(key: any) {
    return this._keyMap.has(key);
  }

  /**
   * 返回所有的key值列表
   */
  keys() {
    return this._keyMap.keys();
  }

  /**
   * 返回所有枚举节点
   */
  values() {
    return this._keyMap.values();
  }
}
const enumKeys = [
  '_enum',
  'map',
  '_keyMap',
  '_valueMap',
  'key',
  'has',
  'keys',
  'values',
  'toArray',
];

const CheckKeys = (args: Array<EnumValue>) => {
  return args.map(a => {
    if (!a[0]) return [Symbol(), a[1]];
    return [...a];
  });
};
