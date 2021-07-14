import React from 'react';
import { CJView } from '../index';
import { Input } from 'antd';

interface IProps {
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class样式 */
  className?: string;
  /* 自定义行内样式(h5) */
  h5Style?: object;
  /* 自定义class(h5) */
  h5Class?: string;
  /* 输入框内容变化时的回调 */
  onCJChangeText?: (e: any) => void;
  /* 输入框类型 */
  inputType?: string;
  /* 剩余参数 */
  [key: string]: any;
  /* 是否校验错误 */
  isVerify?: boolean;
  /* 错误消息 */
  errMsg?: string;
}

export default (props: IProps) => {
  const {
    h5Class,
    h5Style,
    onCJChangeText,
    isVerify,
    errMsg,
    className,
    style,
    inputType,
    ...args
  } = props;
  const _className = !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    className: _className,
    style: { ...h5Style, ...style },
    onChange: (e: any) =>
      onCJChangeText && typeof onCJChangeText === 'function' && onCJChangeText(e.target.value),
    type: inputType,
    ...args,
  };

  return (
    <>
      <Input {..._props} />
      {isVerify && !!errMsg && (
        <div
          style={{
            color: '#fc4b3f',
            fontSize: '12px',
            position: 'static',
            fontWeight: 300,
            left: 0,
            height: '12px',
            lineHeight: '12px',
          }}
        >
          {errMsg}
        </div>
      )}
    </>
  );
};
