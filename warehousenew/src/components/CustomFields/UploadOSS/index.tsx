import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import * as uuid from 'uuid';
import {
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload/interface';
import { authorized } from '@/utils/upload';

type Excludes = 'fileList' | 'onChange' | 'onRemove' | 'transformFile';

export const imageType = ['jpg', 'jpeg', 'png', 'gif'];

interface Limit {
  type?: Array<string>;
  size?: number;
}

/**
 * oss授权接口
 */
const signatureURL = '/app/oss/policy';
/**
 * 集成了阿里云的OSS文件上传组件
 */
interface UploadOSSProps extends Omit<UploadProps, Excludes> {
  value?: Array<any>;
  onChange?: (value: any) => void;
  max?: number;
  limit?: Limit;
}

const UploadOSS: React.FC<UploadOSSProps> = ({
  children,
  onChange,
  value,
  max = Infinity,
  limit,
  ...p
}) => {
  const [OSSData, setOSSData] = useState();
  const [fileList, setFileList] = useState<Array<any>>([]);
  useEffect(() => {
    setFileList(value || []);
  }, [value]);
  const _onChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList);
    onChange && onChange([...fileList]);
  };
  const _onRemove = (file: UploadFile) => {
    const files = fileList.filter(v => v.url !== file.url);
    setFileList(files);
    onChange && onChange(files);
  };
  const _transformFile = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = uuid.v4() + suffix;
    file.url = `${OSSData.host}/${filename}`;
    file.uid = filename;
    return file;
  };
  const _getExtraData = (file: any) => ({
    key: file.uid,
    OSSAccessKeyId: OSSData.accessid,
    policy: OSSData.policy,
    Signature: OSSData.signature,
  });
  const _beforeUpload = async (file: any) => {
    const type = file.type.split('/')[1];
    if (limit && limit.type && !limit.type.includes(type)) {
      return Promise.reject(
        `file type should be ${limit.type.join(',')},but get "${type}"`,
      );
    }
    if (limit && limit.size && limit.size < file.size) {
      message.warn(`上传文件限制大小为${limit.size}B`);
      return Promise.reject(`file size limit ${limit.size}B`);
    }
    try {
      const data = await authorized.get(signatureURL);
      setOSSData(data);
    } catch (e) {
      message.warn('上传授权失败');
      return Promise.reject('authorized failed.');
    }
  };
  const props: UploadProps = {
    ...p,
    name: 'file',
    fileList,
    action: OSSData?.host,
    onChange: _onChange,
    onRemove: _onRemove,
    transformFile: _transformFile,
    data: _getExtraData,
    beforeUpload: _beforeUpload,
  };
  if (limit && limit.type) {
    props.accept = limit.type.map(t => `.${t}`).join(',');
  }
  return <Upload {...props}>{fileList.length < max && children}</Upload>;
};

export default UploadOSS;

interface UploadValidateProps {
  /**
   * 不校验正在上传的
   */
  noValidateUploading?: boolean;
  /**
   * 不校验上传错误的
   */
  noValidateError?: boolean;
}

/**
 * 文件上传校验
 */
export const UploadValidate = (props?: UploadValidateProps) =>
  async function(rules: any, value: UploadFile<any>[]) {
    if (value) {
      const { noValidateUploading, noValidateError } = props || {};
      const hasUploading = value.find(v => v.status === 'uploading');
      const hasError = value.find(v => v.status === 'error');
      if (hasUploading && !noValidateUploading) {
        return Promise.reject('请等待文件上传完成');
      }
      if (hasError && noValidateError) {
        return Promise.reject('存在上传失败文件');
      }
    }
  };
