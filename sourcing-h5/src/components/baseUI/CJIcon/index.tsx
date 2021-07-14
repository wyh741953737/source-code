import React from 'react';

interface IProps {
  /* iconfont名称 */
  name?: string;
  /* iconfont颜色 */
  color?: string;
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class */
  className?: string;
  /* 自定义行内样式(h5) */
  h5Style?: object;
  /* 自定义class(h5) */
  h5Class?: string;
  /* 图标大小 */
  size?: number | string;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    name, h5Style = {}, h5Class, className, style, color, size, onClick, ...args
  } = props;

  const _className = !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    className: `icon ${_className || ''}`,
    style: {
      color, fontSize: `${size || 16}px`, ...h5Style, ...style,
    },
    onClick: (e: any) => {
      if (!!onClick && typeof onClick === 'function') {
        e.stopPropagation();
        onClick();
      }
    },
    ...args,
  };

  return (
    <svg {..._props} aria-hidden="true">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
