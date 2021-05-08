import React from 'react';

interface IProps {
  /* 子元素 */
  children: React.ReactNode;
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class样式 */
  className?: string;
  /* 样式类名 */
  h5Class?: string;
  /* 自定义样式 */
  h5Style?: object;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const { children, h5Class, className, style, h5Style, ...args } = props;
  const _className =
    !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    className: _className,
    style: { overflow: 'auto', ...h5Style, ...style },
    ...args,
  };

  return <div {..._props}>{children}</div>;
};
