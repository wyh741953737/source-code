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
  /* 点击事件 */
  onClick: () => void;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps | any) => {
  const {children, h5Class, h5Style, className, style, ...args} = props;
  const _className =
    !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    className: _className,
    style: {...h5Style, ...style},
    ...args,
  };

  return <CJView {..._props}>{children}</CJView>;
};
