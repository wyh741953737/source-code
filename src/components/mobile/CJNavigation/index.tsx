import React from 'react';
import { CJView, CJImage } from '@/components/baseUI';
import { IconFont } from '@/global';
import { CJLanWare } from '../index';
import styles from './styles';

interface IProps {}

export default (props: IProps) => {
  const {} = props;
  return (
    <CJView className={styles.cj_navigation}>
      {/* <CJImage
        src={require('@/assets/images/logo.png')}
        className={styles.cj_logo}
      /> */}
      <IconFont className={styles.cj_logo} type="icon-logo" />
      <CJView className={styles.cj_btn_box}>
        <IconFont
          className={styles.cj_btn}
          type="icon-sousuo"
          style={{ fontSize: 24, color: '#969696' }}
        />
        <IconFont
          className={styles.cj_btn}
          type="icon-gerenzhongxin1"
          style={{ fontSize: 24, color: '#969696' }}
        />
        <CJView className={styles.cj_btn}>
          <CJLanWare>
            <IconFont
              type="icon-qiehuan"
              style={{ fontSize: 24, color: '#969696' }}
            />
          </CJLanWare>
        </CJView>
      </CJView>
    </CJView>
  );
};
