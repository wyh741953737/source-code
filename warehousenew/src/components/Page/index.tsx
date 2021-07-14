/**
 * @description page 组件
 * @author zhengwenjian
 */

import React from 'react';
import styles from './index.less';

type Props = {
  children: React.ReactNode;
  style?: object;
};

export default ({ children, style = {} }: Props) => {
  return (
    <div className={styles.main} style={style}>
      {children}
    </div>
  );
};
