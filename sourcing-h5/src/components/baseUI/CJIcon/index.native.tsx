import React from 'react';
import Icon from '../../../../../iconfont';
import px2dp from '../../../utils/px2dp';
import {CJView} from '../index';

interface IProps {
  /* iconfont 名称 */
  name?: string;
  /* iconfont颜色 */
  color?: string;
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class */
  className?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 自定义class(rn) */
  rnClass?: object;
  /* 图标大小 */
  size?: number | string;
  /* 点击事件 */
  onClick?: () => void;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    name,
    rnClass,
    rnStyle = {},
    className,
    style,
    color,
    size,
    onClick,
  } = props;

  const _props = {
    name,
    color,
    size: size && px2dp(Number(size)),
    style: [className, rnClass, style, rnStyle],
  };

  return (
    <CJView onClick={!!onClick && typeof onClick === 'function' && onClick}>
      {/*@ts-ignore*/}
      <Icon {..._props} />
    </CJView>
  );
};
