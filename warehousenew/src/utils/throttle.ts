export interface ThrottleFn extends Function {
  __throttleID?: number;
}

export interface ThrottleParam {
  context?: any;
  args?: Array<any>;
  time?: number;
}

/**
 * 节流器
 * @param fn 被节流的执行函数
 * @param params 执行函数参数
 */
const throttle = function(fn: ThrottleFn, params?: ThrottleParam) {
  let p = { context: null, args: [], time: 1000, ...params };
  throttle.clear(fn);
  fn.__throttleID = window.setTimeout(function() {
    fn.apply(p.context, p.args);
  }, p.time);
};
/**
 * 停止节流器
 * @param fn 被节流的执行函数
 */
throttle.clear = function(fn: ThrottleFn) {
  fn.__throttleID && window.clearTimeout(fn.__throttleID);
};
export default throttle;

/**
 * 实例化一个防抖器
 */
throttle.new = function() {
  class _throttle {
    timer: any = null;
    /**
     * 设置防抖事件
     * @param fn 防抖事件
     * @param params 防抖参数
     */
    dispatch = (fn: () => Promise<any> | void, params?: ThrottleParam) => {
      return new Promise((resolve, reject) => {
        this.clear();
        this.timer = window.setTimeout(async function() {
          try {
            const re = await fn
              // @ts-ignore
              .apply(params?.context, params?.args);
            resolve(re);
          } catch (e) {
            reject(e);
          }
        }, params?.time || 1000);
      });
    };
    clear = () => {
      this.timer && window.clearTimeout(this.timer);
    };
  }

  return new _throttle();
};
