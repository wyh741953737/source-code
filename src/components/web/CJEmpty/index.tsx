import React from 'react';
import Empty from '@/assets/images/empty.png';
import styles from './index.less';

interface WProps {
  text?: string;
}

/** 空白页 */
export default (props: WProps) => {
  const { text = 'No goods available' } = props;
  return (
    <div className={styles.empty}>
      <div className={styles.image}>
        <img src={Empty} alt="" />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
