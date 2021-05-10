import * as common from '../../../navigation/common';

/**
 *跳转到指定页面
 * @params {String} path 路由
 * @params {String} params 参数
 * @example pushPage('/demo', { abc: '123' });
 */
export function pushPage(path: string, params?: object) {
  common.toPage(path, params);
}

/**
 *返回上个页面
 */
export function goBack() {
  common.goBack();
}

/**
 *跳转web view
 * @options {Object} params 配置参数
 * @example goWebViewPage({ url: '/demo', title: 'web view Demo' });
 */
export function goWebViewPage(options?: object) {
  common.toPage('/webview', options);
}
