import React from 'react';
import {CJView} from '../index';

interface IProps {
  /* 子元素 */
  children?: React.ReactNode;
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class样式 */
  className?: object;
  /* 自定义行内样式(h5) */
  h5Style?: object;
  /* 自定义class样式(h5) */
  h5Class?: object;
  /* 背景图路径 */
  source: string | {uri: string} | undefined;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {children, h5Class, h5Style, className, style, source, ...args} = props;
  const _className =
    !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  let src = null;

  if (!!source && typeof source === 'object' && source.uri) {
    src = source.uri;
  } else if (!!source && typeof source === 'string') {
    src = source;
  }

  const _props = {
    className: _className,
    style: {
      backgroundImage: src && `url(${src})`,
      ...h5Style,
      ...style,
    },
    ...args,
  };

  return <CJView {..._props}>{children}</CJView>;
};
