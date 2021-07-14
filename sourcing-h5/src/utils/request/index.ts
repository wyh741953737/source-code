import axios from 'axios';
import {CJToast} from '../../components/baseUI';
import {apiBaseUrl} from '../../config';

export default (options: any) => {
  const {
    data,
    loading = true,
    method = 'get',
    baseURL = apiBaseUrl.sourcingApi,
    ...args
  } = options;

  const _options = {
    method,
    baseURL,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data,
    headers: {
      Authorization:
        '025Jn9u+DIVWWQlXKzV5f8wX8mcwLdmrOJeGw9jv3X3Hi3+tc6j0sZVhOXPrTBArPlvKX7kHrLTaGXK3ANMvKCQqDgMS+j60KEc5dJYXCqJXMQ=',
    },
    ...args,
  };

  loading && CJToast.loading('loading', 0);

  return axios(_options)
    .then((response: any) => {
      const {
        data: {message, success},
      } = response;

      if (success) {
        return Promise.resolve(response.data);
      }

      return Promise.reject(new Error(message));
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      CJToast.hide();
    });
};
