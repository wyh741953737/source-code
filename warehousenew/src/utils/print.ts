import qs from 'qs';
/**
 * 打印服务，需要应用软件支持
 * @param url 需要打印文件的url
 */

interface ResponseData {
  code: string;
  message: string;
  data: Array<string>;
}
interface urlItem {
  url: string;
  logisticsChannel: string;
  orderId: string;
  logisticsCompany: string;
}

type Request = (url: Array<urlItem>) => Promise<ResponseData>;
const printRequest: Request = function(url: Array<urlItem>) {
  return new Promise((resolve, reject) => {
    const isLink = url.every(item => LINK.test(item.url));
    if (!isLink) return reject({ type: 'urlError', message: '打印链接错误' });
    let xhr = new XMLHttpRequest();
    xhr.open('post', `http://127.0.0.1:7777/storehouse/print/printPdf`, true);
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
    };

    xhr.send(JSON.stringify(url));
  });
};
export default printRequest;

export const LINK = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
// 下载链接
export const downloadUrl =
  'https://cc-west-usa.oss-us-west-1.aliyuncs.com/printservice/CJ-Print.exe';
