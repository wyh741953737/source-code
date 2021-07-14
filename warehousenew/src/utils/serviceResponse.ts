import { AxiosResponse } from 'axios';
import { message as Message } from 'antd';
import { CustomAxiosRequestConfig } from '@/utils/request';
import { history } from '@@/core/history';

export interface SuccessResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export type PromiseSuccessResponse<T = any> = Promise<SuccessResponse<T>>;

export type ServiceResponse = Promise<SuccessResponse> | SuccessResponse;

interface CustomAxiosResponse extends AxiosResponse {
  config: CustomAxiosRequestConfig;
}

interface Services {
  default: (response: CustomAxiosResponse) => ServiceResponse;

  [name: string]: (response: CustomAxiosResponse) => ServiceResponse;
}

const services: Services = {
  app: response => {
    const { statusCode, result, message } = response.data;
    if (statusCode != '200') {
      return Promise.reject({
        code: Number(statusCode),
        data: result,
        message,
      });
    }
    return { code: 200, data: result, message };
  },
  default: response => {
    const { code, data, messageCn } = response.data;
    if (code === 601) {
      history.push('/');
      return Promise.reject('登录token过期或未登录');
    }
    if (code != '200') {
      if (!response.config.noErrorMessage) Message.error(messageCn, 3);
      return Promise.reject({ code: Number(code), data, message: messageCn });
    }
    return { code: 200, data, message: messageCn };
  },
};
export default services;
