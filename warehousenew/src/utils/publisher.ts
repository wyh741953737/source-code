/**
 * 小型的发布订阅类
 */
export default class Publisher<K = any, C = any> {
  listeners = new Map<any, object>();
  addListener = (key: K, callback: (e: C) => void) => {
    const listenId = Symbol();
    this.listeners.set(key, {
      ...(this.listeners.get(key) || {}),
      [listenId]: callback,
    });
    return this.clearListener.bind(this, key, listenId);
  };
  dispatch = (key: K, e?: C) => {
    const listenerObj = this.listeners.get(key);
    if (!listenerObj) return;
    // @ts-ignore
    Object.getOwnPropertySymbols(listenerObj).map(i => listenerObj[i](e));
  };
  clearListener = (key: K, listenId: Symbol) => {
    const listener = this.listeners.get(key);
    if (!listener) return;
    // @ts-ignore
    delete listener[listenId];
  };
}
