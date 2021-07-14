import React from 'react';
import qs from 'qs';
import { Modal } from 'antd';

/**
 * 打印服务，需要应用软件支持
 * @param url 需要打印文件的url
 */

type ResponseData = boolean;
interface params {
  title: string;
  url: string;
}

type Request = (data: Array<params>) => Promise<ResponseData>;
const printRequest: Request = function(data: Array<params>) {
  const url = data[0].url;
  return new Promise((resolve, reject) => {
    const isLink = LINK.test(url);
    if (!isLink) return reject({ type: 'urlError', message: '打印链接错误' });
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://127.0.0.1:9999/marking?url=${url}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({ type: 'serviceError', message: '服务报错' });
      }
    };
    xhr.onerror = e => {
      // 接口未找到说明服务未启动
      reject({ type: 'noService', message: '打印服务未安装/启动' });
      Modal.info({
        title: '提示',
        width: 500,
        content: (
          <div>
            请确定打印服务是否启动，如果未安装，请先
            <a href={downloadUrl} target="_blank">
              点击下载
            </a>
            , 然后重新打印
          </div>
        ),
        onOk() {},
      });
    };

    xhr.send(JSON.stringify({}));
  });
};
export default printRequest;

export const LINK = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
// 下载链接
export const downloadUrl = 'http://erp.cjdropshipping.cn/down/cjapp.zip';
