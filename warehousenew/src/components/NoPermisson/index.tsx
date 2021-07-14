import React, { FC } from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import img from '@/assist/nopermisson.png';
import styles from './index.less';

interface Props {}
const NoPermisson: FC<any> = (props: Props) => {
  return (
    <div className={styles['no-permisson']}>
      <div className={styles.img}>
        <img src={img} alt="暂无权限" />
        <div className={styles.text}>暂无权限</div>
        <div className={styles.tip}>请联系管理员进行配置相关权限</div>
      </div>
    </div>
  );
};

export default BreadcrumbHeader([])(() => {
  return <NoPermisson />;
});
