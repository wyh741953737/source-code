import { AxiosResponse } from 'axios';
import { CustomResponse } from './index';

interface FormatFun {
  (response: AxiosResponse): CustomResponse;
}

interface FormatJson {
  [name: string]: FormatFun;
}

const formatJson: FormatJson = {
  // 服务的旧接口格式转化为新格式
  default: (response: AxiosResponse) => response,
  'original-service': (response: AxiosResponse) => {
    // { statusCode, result, message } => { code, data, message, success }

    response.data.code = +response.data.statusCode;
    response.data.success = response.data.code === 200;
    response.data.data = response.data.result;

    delete response.data.statusCode;
    delete response.data.result;

    return response;
  },
  cjEvaluation: (response: AxiosResponse) => {
    // { code, data, error } => { code, data, message, success }

    response.data.success = response.data.code === 200;
    response.data.message = response.data.message || response.data.error;

    delete response.data.error;

    return response;
  },
};

/** 格式化不同服务的接口 */
export default function formatResponse(response: AxiosResponse) {
  if (!response.config.url) {
    response.data = {};
    return response as CustomResponse;
  }
  const name: string = response.config.url.split('/').filter(Boolean)[0];
  return formatJson[name]
    ? formatJson[name](response)
    : formatJson.default(response);
}
