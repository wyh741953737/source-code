import React, { useState, useEffect, useRef } from 'react';
import { CJView, CJText, CJIcon } from '../index';
import styles from './styles';

const check = 'iconduoxuanyixuanzhong-Multipleselectionselected';
const unCheck = 'iconduoxuanweixuanzhong-Multipleselectionselectionnotselected';

interface IProps {
  /* icon颜色 */
  color?: string;
  /* 是否选中 */
  checked?: boolean | any;
  /* 回调函数 */
  onChange?: (bol: boolean) => void;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    checked, onChange, children, ...args
  } = props;
  const [isChecked, setIsChecked] = useState<boolean>(!!checked);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    typeof onChange === 'function' && onChange(isChecked);
  }, [isChecked]);

  const _props = {
    h5Class: styles.icon_wrap,
    rnClass: styles.icon_wrap,
    onClick: (e: any) => {
      e.stopPropagation();
      setIsChecked(!isChecked);
    },
    ...args,
  };

  const name = isChecked ? check : unCheck;
  const color = isChecked ? '' : '#D9D9D9';

  return (
    <CJView { ..._props }>
      <CJIcon name={ name } color={ color } />
      { children && <CJText className={ styles.icon_text }>{ children }</CJText> }
    </CJView>
  );
};
