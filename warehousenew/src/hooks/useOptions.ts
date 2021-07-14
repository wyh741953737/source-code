import { useEffect, useRef, useState } from 'react';
import Enum from '@/utils/enum';
import Throttle from '@/utils/throttle';
import Publisher from '@/utils/publisher';
import { fromJS, is } from 'immutable';

interface Option {
  key: string | number;
  value: string;

  [name: string]: any;
}

interface Options {
  options: Array<Option>;
  menu: Enum;
}

export interface OptionReturn extends Options {
  setParams: (params: any) => void;
  loading?: boolean;
}

interface Config {
  /**
   * 时间间隔多长时间不重复请求，单位ms
   * 如果params有值那么就是防抖的间隔，此hook认为有params的时候就不会进行相同apply拦截
   */
  interval?: number;
  /**
   * 请求参数，如果变动会自动从新请求
   */
  params?: any;
  /**
   * 开启带参拦截，如果开启可能不可控，需要保持params不能改变
   */
  interceptForParams?: boolean;
  /**
   * 根据判断函数是否要发起从新请求
   */
  reApply?: (req: () => void) => any;
  /**
   * apply回来后的回调，等同于options和menu发生变化的回调
   * @param option
   */
  callback?: (option: Options) => void;
}

type UseOptions = (apply: Apply, config?: Config) => [OptionReturn];
/**
 * 动态加载option的hook，对多次调用同个apply进行了不重复调用的优化
 * @param apply 需要调用的apply
 * @param config 配置
 */
const useOptions: UseOptions = (apply, config) => {
  const [options, setOptions] = useState<Array<Option>>([]);
  const [menu, setMenu] = useState<Enum>(new Enum([]));
  const [requestId, setRequestId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [throttle] = useState(Throttle.new());
  const [params, setParams] = useState(config?.params);
  const interval = isNaN(Number(config?.interval))
    ? 500
    : Number(config?.interval);
  config?.reApply && config?.reApply(() => setRequestId(requestId + 1));
  // 根据config.params变化判断是否需要重新发起请求
  useEffect(() => {
    if (!is(fromJS(config?.params), fromJS(params))) {
      setRequestId(requestId + 1);
      setParams(config?.params);
    }
  }, [config?.params]);
  // 主动设置params，会判断是否需要重新发起请求
  const _setParams = (nextParams: any) => {
    if (!is(fromJS(nextParams), fromJS(params))) {
      setRequestId(requestId + 1);
      setParams(nextParams);
    }
  };
  useEffect(() => {
    const opt = optionStore.get(apply);
    // 记录中存在此apply的并且小于上次发起的时间间隔、没有参数或者强制拦截
    if (
      opt &&
      !opt.error &&
      new Date().getTime() - opt.time < interval &&
      (!params || config?.interceptForParams)
    ) {
      if (opt.finish && opt.options && opt.enum) {
        // 当上一个请求已经完成直接拿上次的值
        setOptions(opt.options);
        setMenu(opt.enum);
        config?.callback &&
          config?.callback({ options: opt.options, menu: opt.enum });
        return;
      }
      // 上次请求还未完成，那么就发送订阅事件等待完成
      setLoading(true);
      const listener = optionListener.addListener(apply, e => {
        e.options && setOptions(e.options);
        e.enum && setMenu(e.enum);
        config?.callback &&
          config?.callback({
            options: e.options as Array<Option>,
            menu: e.enum as Enum,
          });
        setLoading(false);
      });
      return () => listener();
    }
    throttle.dispatch(() => doApply(params), { time: interval });
    return () => throttle.clear();
  }, [requestId]);
  // 发起apply请求
  const doApply = async (params: any) => {
    // 判断是否要进行拦截处理，这里仅仅是记录参数，真正的拦截是在前面的判断
    const ifIntercept = !params || config?.interceptForParams;
    ifIntercept &&
      optionStore.set(apply, {
        time: new Date().getTime(),
        finish: false,
      });
    setLoading(true);
    try {
      const resp = await apply(params);
      const en = new Enum(resp.map(i => ['', i]));
      setOptions(resp);
      setMenu(en);
      config?.callback && config?.callback({ options: resp, menu: en });
      if (ifIntercept) {
        const val = {
          options: resp,
          enum: en,
          time: new Date().getTime(),
          finish: true,
        };
        optionStore.set(apply, val);
        optionListener.dispatch(apply, val);
      }
    } catch (e) {
      ifIntercept &&
        optionStore.set(apply, {
          options: [],
          enum: new Enum([]),
          time: new Date().getTime(),
          finish: true,
          error: true,
        });
    }
    setLoading(false);
  };
  return [{ options, menu, setParams: _setParams, loading }];
};
export default useOptions;
/**
 * 提供option的service的调用和数据组装描述
 */
export type Apply = (params?: any) => Promise<Array<Option>>;

interface OptionStoreValue {
  options?: Array<Option>;
  enum?: Enum;
  /**
   * 请求发起时间戳
   */
  time: number;
  /**
   * 请求是否完成
   */
  finish: boolean;
  /**
   * 请求是否成功
   */
  error?: boolean;
}

const optionStore = new Map<Apply, OptionStoreValue>();

const optionListener = new Publisher<Apply, OptionStoreValue>();
