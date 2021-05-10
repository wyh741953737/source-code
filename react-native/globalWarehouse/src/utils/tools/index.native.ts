import { pageBaseUrl } from '../../config';

/**
 * web view 资源路径识别
 * 带有域名直接访问，不带使用项目配置域名访问
 * @params {String} url
 * @return {String}
 * */
export const matchWebViewUrl = (url: string): string => {
  if (typeof url !== 'string') {
    return '';
  }
  const regExp = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;

  return url.match(regExp) ? url : pageBaseUrl.sourcingPage + url;
};

/**
 * 获取路由参数
 * @params props 页面参数
 */
export const getRouteParams = (props: any) => props.route.params || {};
