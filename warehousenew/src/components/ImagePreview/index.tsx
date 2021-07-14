import React from 'react';
import style from './index.less';
import { Popover, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface ImagePreview {
  url: string;
  size?: number;
  prevSize?: number;
}
export default (props: ImagePreview) => {
  const size = props.size || 40;
  const prevSize = props.prevSize || 200;
  const content = (
    <Image
      src={`${props.url}?x-oss-process=image/resize,w_${prevSize},m_lfit`}
      placeholder={<LoadingOutlined />}
      width={prevSize}
      preview={false}
      fallback={require('@/assist/cjlogo.png')}
    />
  );
  return (
    <Popover placement={'rightTop'} content={content}>
      <Image
        className={style['small-image']}
        src={`${props.url}?x-oss-process=image/resize,h_${size},m_lfit`}
        width={size}
        height={size}
        preview={false}
        fallback={require('@/assist/cjlogo.png')}
      />
    </Popover>
  );
};
