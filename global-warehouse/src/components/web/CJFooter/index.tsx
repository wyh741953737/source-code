import React from 'react';
import styles from './index.less';

interface WProps {
  hasLeftText?: boolean;
}

/** 底部导航 */
export default (props: WProps) => {
  return (
    <div className={styles.footer}>
      {props.hasLeftText ? (
        <div className={styles.leftText}>
          <span>Terms of Use</span>
          <span>Privacy policy</span>
          <span>Help</span>
        </div>
      ) : null}
      <div className={styles.text}>
        {' '}
        © 2014 - 2021 CJdropshipping.com All Rights Reserved
      </div>
    </div>
  );
};
