import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface IProps {
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class样式 */
  className?: object;
  /* 自定义按钮行内样式(rn) */
  rnStyle?: object;
  /* 自定义按钮class样式(rn) */
  rnClass?: object;
  /* 子元素 */
  children?: string | React.ReactNode;
  /* 剩余参数 */
  [key: string]: any;
}

const styles = StyleSheet.create({
  warp: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default (props: IProps) => {
  const {children, rnStyle, rnClass, className, style} = props;

  return (
    <SafeAreaView style={[styles.warp, className, rnClass, style, rnStyle]}>
      {children}
    </SafeAreaView>
  );
};
