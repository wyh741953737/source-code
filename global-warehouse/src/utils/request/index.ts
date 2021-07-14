import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { CJToast } from '../../components';
import { apiBaseUrl } from '../../config';
import { getTokenStorage } from '../storage';
import formatResponse from './service';

const { GLOBAL_SERVICE } = process.env;

/** 接口请求配置 */
interface RequestConf extends AxiosRequestConfig {
  /** loading动画 */
  loading?: boolean;
  /** 是否展示默认错误弹窗信息 */
  showErrorMsg?: boolean;
}

/** 接口响应配置 */
export interface CustomResponse extends AxiosResponse {
  data: SuccessResponse;
  config: RequestConf;
}

/** 成功返回值 */
interface SuccessResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = SuccessResponse<T>>(
    url: string,
    config?: RequestConf,
  ): Promise<R>;

  post<T = any, R = SuccessResponse<T>>(
    url: string,
    data?: any,
    config?: RequestConf,
  ): Promise<R>;
}

const instance: CustomAxiosInstance = axios.create({
  timeout: 15000,
  timeoutErrorMessage: 'Service timeout!',
  baseURL: GLOBAL_SERVICE === 'proxy' ? undefined : apiBaseUrl.sourcingApi,
  headers: {
    'Content-Type': 'application/json;',
  },
});

instance.interceptors.request.use(
  async (config: RequestConf) => {
    const { loading = true } = config as RequestConf;
    loading && CJToast.loading();
    const token = await getTokenStorage();
    // eslint-disable-next-line no-param-reassign
    config.headers.token = token;
    return config;
  },
  (err: any) => {
    CJToast.hide();
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  async (response: CustomResponse) => {
    CJToast.hide();
    const {
      config: { showErrorMsg = true },
    } = response;
    const { data = {} as any } = formatResponse(response);
    if (!data?.success && showErrorMsg) {
      CJToast.fail(data?.message, 2);
      console.log(111);
    }
    return data;
  },
  (error: any) => {
    CJToast.hide();
    if (error.message === 'Network Error') {
      CJToast.fail('Network Error', 2);
      console.log(222);
    } else {
      CJToast.fail('Service Error', 2);
      console.log(333);
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  },
);

export default instance;
