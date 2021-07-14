import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios';
import { message } from 'antd';
import services, { ServiceResponse, SuccessResponse } from './serviceResponse';
import storage from '@/utils/storage';
import { history } from 'umi';

// 存放请求实例
let requestMap = new Map<string, Canceler>();

const axiosInstance = axios.create({
  timeout: 50000, // 超时20秒
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
    clientType: 'web',
    version: process.env.version,
  },
  // 跨域是否携带身份凭证
  withCredentials: true, // default
  // 返回数据的格式arraybuffer,blob,document,json,text,stream
  responseType: 'json', // default
  // xsrf
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // http响应内容的最大值
  maxContentLength: 2000,
  // `validateStatus`定义了是否根据http相应状态码，来resolve或者reject promise
  // 如果`validateStatus`返回true(或者设置为`null`或者`undefined`),那么promise的状态将会是resolved,否则其状态就是rejected
  validateStatus: function(status) {
    return status >= 200 && status < 400; // default
  },
});

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  /** 是否关闭默认的错误提示 */
  noErrorMessage?: boolean;
  /** 开启防止重复请求模式 */
  noRepeat?: boolean;
}
// http request 拦截
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const isPost = config.method === 'post';
    const token = storage.localGet('_TOKEN_') ?? '';
    if (token) config.headers.token = token;
    // 外部没有自己拿cancelToken并且开启了不重复请求模式
    if (!config.cancelToken && config.noRepeat && config.url) {
      config.cancelToken = new axios.CancelToken(c => {
        let req = requestMap.get(config.url as string);
        req && req();
        requestMap.set(config.url as string, c);
      });
    }
    if (isPost && !config.data) {
      // 后端需求没有参数必须要传空的对象
      config.data = {};
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const deconcentrator = function(response: AxiosResponse): ServiceResponse {
  if (!response.config.url) return Promise.reject({});
  const name: string = response.config.url.split('/').filter(Boolean)[0];
  return services[name] ? services[name](response) : services.default(response);
};

// http response 拦截器
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function(response) {
    if (response.config.url) {
      requestMap.delete(response.config.url);
    }
    const { responseType } = response.config;
    if (responseType === 'blob') {
      return response.data;
    }
    return deconcentrator(response);
  },
  //接口错误状态处理，也就是说无响应时的处理
  // @ts-ignore
  error => {
    if (error.message === 'Network Error') {
      message.error('网络错误');
    } else {
      message.error('服务器打盹了');
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  },
);

interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = SuccessResponse<T>>(
    url: string,
    config?: CustomAxiosRequestConfig,
  ): Promise<R>;

  post<T = any, R = SuccessResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<R>;
}

export default axiosInstance as CustomAxiosInstance;

/**
 * 以下是拦截并重试多次请求的代码，目前仅支持post和get
 */
const openRetryMethod = () => {
  const old = {
    post: axiosInstance.post,
    get: axiosInstance.get,
  };
  const repeatCount = 3;
  axiosInstance.post = (...args) => {
    return new Promise((resolve, reject) => {
      let requestCount = 0;
      const dispatch = () => {
        old
          .post(...args)
          .then(e => resolve(e as any))
          .catch(e => {
            if (e.code) return reject(e);
            if (requestCount >= repeatCount - 1) {
              if (e.message === 'Network Error') {
                message.error('网络错误');
              } else {
                message.error('服务器打盹了');
              }
              return reject(e);
            }
            requestCount++;
            setTimeout(dispatch, requestCount * 3000);
          });
      };
      dispatch();
    });
  };
  axiosInstance.get = (...args) => {
    return new Promise((resolve, reject) => {
      let requestCount = 0;
      const dispatch = () => {
        old
          .get(...args)
          .then(e => resolve(e as any))
          .catch(e => {
            if (e.code) return reject(e);
            if (requestCount >= repeatCount - 1) {
              if (e.message === 'Network Error') {
                message.error('网络错误');
              } else {
                message.error('服务器打盹了');
              }
              return reject(e);
            }
            requestCount++;
            setTimeout(dispatch, requestCount * 3000);
          });
      };
      dispatch();
    });
  };
};
// 开启错误重试机制
// openRetryMethod();
