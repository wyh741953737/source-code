import {toPage, goBack} from '../../../../navigation/common';

export const toBack = () => {
  goBack();
};

export const toDemo1 = () => {
  toPage('/demo2');
};

export const toDemo2 = () => {
  toPage('/demo2');
};

export const toDemo3 = () => {
  toWebViewPage({url: '/Demo3', title: 'web view Demo3'});
};

/**
 * 跳转到web view页面的方法
 * @params object options
 * @example toWebViewPage({url: '/Demo3', title: 'web view Demo3'})
 * */
export const toWebViewPage = (options: object) => {
  toPage('/webview', options);
};
