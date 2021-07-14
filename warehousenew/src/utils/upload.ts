import * as uuid from 'uuid';
import axios from 'axios';
import storage from './storage';

interface ClientOSSUpload {
  /**
   * 文件，可以是多个文件
   */
  files: Array<File> | File;
  /**
   * 授权地址，默认 https://app.cjdropshipping.com/app/oss/policy
   */
  signatureURL?: string;
}

const defaultSignatureUrl = 'https://app.cjdropshipping.com/app/oss/policy';

export default async function upload({
  files,
  signatureURL = defaultSignatureUrl,
}: ClientOSSUpload) {
  return Array.isArray(files)
    ? await Promise.all(files.map(file => _uploadFileToOSS(file, signatureURL)))
    : await _uploadFileToOSS(files, signatureURL);
}

/** upload image to 阿里云 OSS server */
async function _uploadFileToOSS(file: File, signatureURL: string) {
  if (!(file instanceof File)) {
    return Promise.reject(`Not a valid file.`);
  }

  let { accessid, host, policy, signature } = await authorized.get(
    signatureURL,
  );

  let formData = new FormData(),
    fileName = `${uuid.v4() + file.name.substr(file.name.lastIndexOf('.'))}`;

  formData.append('key', fileName); // 唯一文件名
  formData.append('policy', policy); // policy
  formData.append('OSSAccessKeyId', accessid); // accessKeyId
  formData.append('success_action_status', '200'); // 成功后返回的操作码
  formData.append('Signature', signature); // 鉴权签名
  formData.append('file', file);

  /**
   * 图片上传至阿里云 OSS
   * fetch 参考链接 [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch]
   * http.post(host, formData, { headers: { 'Content-Type': 'multipart/form-data' } }) // 可用
   * @return [注意，没有返回值，code==200就是成功]
   */
  await window.fetch(host, { method: 'POST', body: formData });
  return `${host}/${fileName}`;
}

/**
 * 授权相关
 */
const sessionField = 'oss-authorized-signature';
const expired = 30 * 1000; // AliOSS 过期时间，实测 30秒 [原计划计划10分钟]
export const authorized = {
  _getKey: function() {
    return storage.localGet(sessionField);
  },
  _setKey: function(value: any) {
    if (typeof value !== 'string') value = JSON.stringify(value);
    storage.localSet(sessionField, value);
  },
  get: async function(signatureURL: string) {
    let key = this._getKey();
    // 如果签名对象存在，并且没有过期
    if (key && key.signature && Date.now() - key.timestamp < expired) {
      return key;
    }
    key = (await axiosInstance.post(signatureURL, {})).data;
    key.timestamp = Date.now();
    this._setKey(key);
    return key;
  },
};

const axiosInstance = axios.create({
  timeout: 20000, // 超时20秒
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
    Referer: '.cjdropshipping.com',
  },
  // 跨域是否携带身份凭证
  withCredentials: true, // default
  // 返回数据的格式arraybuffer,blob,document,json,text,stream
  responseType: 'json', // default
});
