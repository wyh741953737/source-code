import style from './index.less';
import { CopyOutlined } from '@ant-design/icons/lib';
import React from 'react';
import Copy from 'copy-to-clipboard';
import { message } from 'antd';
import PodInfo, { usePodInfo } from '@/components/PodInfo';

interface Props {
  /**
   * sku码
   */
  text: string;
  /**
   * 短码
   */
  shortText: string;
  packageType?: string; //包裹类型
}
export default ({ text, shortText, packageType }: Props) => {
  const copy = (text: string) => {
    Copy(text, {
      format: 'text/plain',
      onCopy: () => {
        message.success('复制成功');
      },
    });
  };
  const [podInfo] = usePodInfo();
  return (
    <div className={style.sku}>
      <span>{text}</span>
      <span>
        <span>短码：{shortText}</span>
        <CopyOutlined className={style.copy} onClick={() => copy(shortText)} />
      </span>
      {/* <span
        className={style.pod}
        title="POD"
        onClick={() => podInfo.show(text)}
      >
        个
      </span> */}
      {packageType ? <span className={style.redTag}>{packageType}</span> : null}
      {/* <PodInfo podInfo={podInfo} /> */}
    </div>
  );
};
