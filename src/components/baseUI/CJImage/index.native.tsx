import React from 'react';
import { CJView } from '../index';
import { Image } from 'react-native';

interface IProps {
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class */
  className?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 自定义class(rn) */
  rnClass?: object;
  /* 图片地址 */
  source?: string | { uri: string };
  /* 默认图片地址 */
  defaultSource?: string | { uri: string };
  /* 剩余参数 */
  [key: string]: any;
}

const defaultImg = require('./default-image.png');

export default (props: IProps) => {
  const {
    rnStyle,
    rnClass,
    className,
    style,
    defaultSource,
    onClick,
    ...args
  } = props;

  const onError = () => {
    console.log('image load error');
  };

  const wrapProps = {
    onClick,
    className,
    rnClass,
    style: [{ overflow: 'hidden', ...style }],
    rnStyle,
  };

  const imgProps = {
    style: { width: '100%', height: '100%' },
    defaultSource: defaultSource || defaultImg,
    onError,
    ...args,
  };

  return (
    <CJView {...wrapProps}>
      {/*@ts-ignore*/}
      <Image {...imgProps} />
    </CJView>
  );
};
