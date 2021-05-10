import React from 'react';
import { Button } from 'antd';
import { getListApi, isRegisterApi } from '@/services/testApi';
import styles from './styles';

export default () => {
  const handleRequest = async () => {
    const res1 = await getListApi({ pageNumber: 1 });
    const res2 = await isRegisterApi({ email: '1162258400@qq.com' });
    console.log(res1);
    console.log(res2);
  };

  return (
    <div className={styles.wrap}>
      <Button onClick={handleRequest}>request</Button>
    </div>
  );
};
