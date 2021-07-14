// @ts-ignore
import { pushPage, goBack, goWebViewPage } from './lib';
import { platform } from '../tools/base';

export const toDemo1 = () => {
  pushPage('/demo1');
};

export const toDemo2 = () => {
  pushPage('/demo2', { abc: '123' });
};

export const toDemo3 = () => {
  if (platform.isApp) {
    goWebViewPage({ url: '/demo3', title: 'web view Demo3' });
  } else {
    pushPage('/demo3');
  }
};

export const toBack = () => {
  goBack();
};
