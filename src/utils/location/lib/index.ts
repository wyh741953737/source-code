import { history } from 'umi';

/**
 *跳转到指定页面
 * @params {String} path 路由
 * @params {String} params 参数
 * @example pushPage('/demo', { abc: '123' });
 */
export function pushPage(path: string, params?: object) {
  history.push(path, params);
}

/**
 *返回上个页面
 */
export function goBack() {
  history.goBack();
}
