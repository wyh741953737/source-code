import {history} from 'umi';

export const toDemo1 = () => {
  history.push('demo1');
};

export const toDemo2 = () => {
  history.push('demo2');
};

export const toDemo3 = () => {
  history.push('demo3');
};

export const toBack = () => {
  history.goBack();
};
