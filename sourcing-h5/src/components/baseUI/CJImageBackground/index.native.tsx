import React from 'react';
import {ImageBackground} from 'react-native';
import {CJView, CJText} from '../index';

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
  /* 背景图路径 */
  source: string | {uri: string} | undefined;
  /* 其他参数 */
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

  const renderImageBackground = (
    // @ts-ignore
    <ImageBackground {..._props}>{_children}</ImageBackground>
  );

  return (
    <>
      {typeof onClick === 'function' ? (
        <CJView onClick={onClick}>{renderImageBackground}</CJView>
      ) : (
        renderImageBackground
      )}
    </>
  );
};
