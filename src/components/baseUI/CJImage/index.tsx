import React from 'react';

interface IProps {
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class */
  className?: string;
  /* 自定义按钮行内样式(h5) */
  h5Style?: object;
  /* 自定义按钮class(h5) */
  h5Class?: string;
  /* 图片地址 */
  source?: string | { uri: string };
  /* 默认图片地址 */
  defaultSource?: string | { uri: string };
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const { h5Style, h5Class, className, style, source, defaultSource, ...args } =
    props;
  const _className =
    !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;
  let src: any = '';
  let defaultSrc: any = null;

  if (!!source && typeof source === 'object' && source.uri) {
    src = source.uri;
  } else if (!!source && typeof source === 'string') {
    src = source;
  }

  if (
    !!defaultSource &&
    typeof defaultSource === 'object' &&
    defaultSource.uri
  ) {
    defaultSrc = defaultSource.uri;
  } else if (!!defaultSource && typeof defaultSource === 'string') {
    defaultSrc = defaultSource;
  }

  const _props: IProps = {
    className: _className,
    style: { ...h5Style, ...style },
    src,
    ...args,
  };

  delete _props.rnStyle;
  delete _props.rnClass;
  delete _props.h5Class;
  delete _props.h5Style;
  delete _props.ref;

  const onError = (e: any) => {
    console.log('image load error');
    e.target.src = defaultSrc || require('./default-image.png');
  };

  return <img {..._props} onError={onError} alt="" />;
};
