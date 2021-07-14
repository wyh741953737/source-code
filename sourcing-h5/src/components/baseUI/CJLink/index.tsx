import React from 'react';

interface IProps {
  /* 网页链接地址 */
  to: string;
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class样式 */
  className?: string;
  /* 自定义按钮行内样式(h5) */
  h5Style?: object;
  /* 自定义按钮class(h5) */
  h5Class?: string;
  /* 其他参数 */
  [key: string]: any;
}

const Link: React.FC<IProps> = props => {
  const { to, h5Class, h5Style, className, style, ...arg } = props;
  const _className = !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    href: to,
    className: _className,
    style: { ...h5Style, ...style },
    ...arg,
  };

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {..._props} />;
};

export default Link;
