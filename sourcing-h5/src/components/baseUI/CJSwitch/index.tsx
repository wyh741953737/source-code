import React, { useState, useEffect, useRef } from 'react';
import { CJIcon, CJView } from '../index';

interface IProps {
  /* 是否选中 */
  checked?: boolean | any;
  /* 回调函数 */
  onChange?: (bol: boolean) => void;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    checked, size = 50, onChange,
  } = props;
  const firstLoad = useRef(true);
  const [isChecked, setIsChecked] = useState<boolean>(!!checked);

  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    typeof onChange === 'function' && onChange(isChecked);
  }, [isChecked]);

  return (
    <CJView onClick={ handleSwitch }>
      { isChecked ? (
        <CJIcon name="iconkaiqi-Open" size={ size } />
      ) : (
        <CJIcon name="iconweikaiqi-Notopen" size={ size } />
      ) }
    </CJView>
  );
};
