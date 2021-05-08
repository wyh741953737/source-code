import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './styles';

interface IProps {
  /* 前缀图标 */
  prefix?: React.ReactNode;
  /* 后缀图标 */
  suffix?: React.ReactNode;
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class样式 */
  className?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 自定义class(rn) */
  rnClass?: object;
  /* 自定义input样式 */
  rnInputStyle?: object;
  /* 是否校验错误 */
  isVerify?: boolean;
  /* 错误消息 */
  errMsg?: string;
  /** 错误消息样式 */
  errMsgRnClass?: object;
  /* 输入框内容变化时的回调 */
  onCJChangeText?: () => void;
  /* 输入框类型 */
  inputType?: string;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    className,
    style,
    rnClass,
    rnStyle,
    rnInputStyle,
    prefix,
    suffix,
    errMsg,
    errMsgRnClass,
    isVerify,
    onCJChangeText,
    inputType,
    ...args
  } = props;
  const inputProps = {
    onChangeText:
      onCJChangeText && typeof onCJChangeText === 'function' && onCJChangeText,
    autoCapitalize: 'none',
    secureTextEntry: inputType === 'password',
    style: [styles.input, rnInputStyle],
    ...args,
  };

  return (
    <>
      <View
        style={[
          styles.input_warp,
          isVerify && !!errMsg && { borderColor: '#FC4B3F' },
          className,
          rnClass,
          style,
          rnStyle,
        ]}
      >
        {!!prefix && <View style={styles.prefix}>{prefix}</View>}
        {/* @ts-ignore */}
        <TextInput {...inputProps} />
        {!!suffix && <View style={styles.suffix}>{suffix}</View>}
        {isVerify && !!errMsg && (
          <Text style={[styles.errMsg, errMsgRnClass]}>{errMsg}</Text>
        )}
      </View>
    </>
  );
};
