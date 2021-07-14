import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { elementClick } from '../../../utils/jsTracking';
import styles from './styles';

interface IProps {
  /* 按钮类型 primary | default */
  type?: string;
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class */
  className?: object;
  /* 自定义按钮行内样式(rn) */
  rnStyle?: object;
  /* 自定义按钮class样式(rn) */
  rnClass?: object;
  /* 自定义按钮文字样式 */
  textStyle?: object;
  /* 是否禁用按钮 */
  disabled?: boolean;
  /* 按钮事件 onClick ｜ onPress */
  onClick?: () => void;
  /* 按钮事件 onClick ｜ onPress */
  onPress?: () => void;
  /* 按钮文字 */
  children?: string | React.ReactNode;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    type = 'default',
    className,
    style,
    rnStyle,
    rnClass,
    textStyle,
    disabled,
    onClick,
    onPress,
    children,
    ...args
  } = props;

  let _onClick;
  // 点击上报
  if (props['data-tracking-element-click']) {
    _onClick = () => {
      typeof onClick === 'function' && onClick();
      elementClick(JSON.parse(props['data-tracking-element-click']));
    };
  } else {
    _onClick = onClick;
  }

  const btnProps = {
    disabled,
    style: [
      type === 'default' && styles.default_style,
      type === 'primary' && styles.primary_style,
      type === 'default' && disabled && styles.default_style_disabled,
      type === 'primary' && disabled && styles.primary_style_disabled,
      className,
      rnClass,
      style,
      rnStyle,
    ],
    onPress: (onPress && typeof onPress === 'function' && onPress) || _onClick,
    activeOpacity: 0.5,
    ...args,
  };

  const textProps = {
    style: [
      type === 'default' && styles.default_text,
      type === 'primary' && styles.primary_text,
      type === 'default' && disabled && styles.default_disabled_text,
      type === 'primary' && disabled && styles.primary_disabled_text,
      textStyle,
    ],
  };

  return (
    <TouchableOpacity {...btnProps}>
      <Text {...textProps}>{children}</Text>
    </TouchableOpacity>
  );
};
