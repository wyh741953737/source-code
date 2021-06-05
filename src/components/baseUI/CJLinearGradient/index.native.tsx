/*
 * 文档 https://github.com/react-native-linear-gradient/react-native-linear-gradient
 * */
import React from 'react';
import { CJText, CJView } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground } from 'react-native';

interface IProps {
  /* 子元素 */
  children?: React.ReactNode;
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class样式 */
  className?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 自定义class样式(rn) */
  rnClass?: object;
  /* 点击事件 */
  onClick: () => void;
  /* LinearGradient组件文档参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    children,
    rnClass,
    rnStyle,
    className,
    style,
    onClick,
    ...args
  } = props;
  const _children =
    typeof children === 'string' ? <CJText>{children}</CJText> : children;

  const _props = {
    style: [className, rnClass, style, rnStyle],
    ...args,
  };

  const renderLinearGradient = (
    // @ts-ignore
    <LinearGradient {..._props}>{_children}</LinearGradient>
  );

  return (
    <>
      {typeof onClick === 'function' ? (
        <CJView onClick={onClick}>{renderLinearGradient}</CJView>
      ) : (
        renderLinearGradient
      )}
    </>
  );
};
