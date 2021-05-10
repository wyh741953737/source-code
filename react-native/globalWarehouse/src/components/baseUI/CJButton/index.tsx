import React from 'react';
import { Button } from 'antd-mobile';
import styles from './styles.less';

interface IProps {
  /* 按钮类型 primary | default */
  type?: 'primary' | 'default' | any;
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class */
  className?: string | string[];
  /* 自定义按钮行内样式（h5） */
  h5Style?: object;
  /* 自定义按钮class（h5） */
  h5Class?: string;
  /* 是否禁用按钮 */
  disabled?: boolean;
  /* 按钮事件 */
  onClick?: () => void;
  /* 按钮文字 */
  children?: string | any;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    type = 'default',
    h5Style,
    h5Class,
    style,
    className,
    disabled,
    children,
    ...args
  } = props;
  const _className =
    !!h5Class && !!className
      ? `${h5Class} ${className}`
      : h5Class || className || '';
  const _props: IProps = {
    className: [
      type === 'default' && styles.default_style,
      type === 'primary' && styles.primary_style,
      type === 'default' && disabled && styles.default_style_disabled,
      type === 'primary' && disabled && styles.primary_style_disabled,
      _className,
    ].filter((item) => item),
    style: { ...h5Style, ...style },
    disabled,
    ...args,
  };

  delete _props.textStyle;
  delete _props.rnStyle;
  delete _props.rnClass;
  delete _props.h5Class;
  delete _props.onPress;

  // @ts-ignore
  return <Button {..._props}>{children}</Button>;
};
