import React from 'react';
import { CJView, CJText } from '@/components/baseUI';
import styles from './style';

export default () => {
  const nowYear = new Date().getFullYear();
  return (
    <CJView className={styles.pageFooter}>
      <CJText className="page-footer-text">
        © 2014 - {nowYear} CJdropshipping.com All Rights Reserved
      </CJText>
    </CJView>
  );
};
