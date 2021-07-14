import React from 'react';
import qs from 'qs';
import { Modal, message, Table } from 'antd';
import { defaultColumns } from '@/utils';

/**
 * 打印服务，需要应用软件支持
 * @param url 需要打印文件的url
 */

type ResponseData = {
  code: string;
  message: string;
  data: Array<string>;
};
interface params {
  url: string;
  logisticsChannel: string;
  orderId: string;
  logisticsCompany: string;
}

const FaliList = ({ dataSource }: any) => {
  return (
    <>
      {dataSource &&
        dataSource.map((item: any) => (
          <div
            style={{ display: 'flex', height: '30px', alignItems: 'center' }}
            key={item.url}
          >
            <p style={{ margin: '0' }}>
              订单号： {item.orderId}&nbsp;&nbsp;
              <a href={item.url} target="_blank">
                PDF打印链接
              </a>
            </p>
          </div>
        ))}
    </>
  );
};

type Request = (
  data: Array<params>,
  callback?: Function,
) => Promise<ResponseData>;
const printRequest: Request = function(
  data: Array<params>,
  callback?: Function,
) {
  return new Promise((resolve, reject) => {
    const isLink = data.every(item => LINK.test(item.url));
    if (!isLink) {
      message.error('打印链接错误');
      return reject({ type: 'urlError', message: '打印链接错误' });
    }
    let xhr = new XMLHttpRequest();
    xhr.open('post', `http://127.0.0.1:7777/storehouse/print/printPdf`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message.loading('打印中，请稍后...', 2);
    xhr.onload = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        console.log(xhr.responseText);
        const response = JSON.parse(xhr.responseText);
        const failData = data.filter(
          (item: any) => response.data.indexOf(item.url) != -1,
        );
        failData.length > 0 &&
          Modal.error({
            width: 450,
            title: '失败列表',
            content: <FaliList dataSource={failData} />,
            onOk: () => {
              console.log('123');
              callback && callback();
            },
          });
        resolve(JSON.parse(xhr.responseText));
      } else {
        message.error('打印失败');
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
    xhr.send(JSON.stringify(data));
  });
};
export default printRequest;

export const LINK = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
// 下载链接
export const downloadUrl =
  'https://cc-west-usa.oss-us-west-1.aliyuncs.com/printservice/CJ-Print.exe';
