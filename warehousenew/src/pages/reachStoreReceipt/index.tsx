import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Tabs } from 'antd';
import style from './index.less';
import ReachSoreReceiptWaiting from './reachSoreReceiptWaiting';
import ReachStoreReceipted from './reachStoreReceipted';

export default BreadcrumbHeader([{ name: '出库' }, { name: '到达仓签收' }])(
  () => {
    return (
      <Tabs defaultActiveKey="1" className={style.container}>
        <Tabs.TabPane tab="待签收" key="1">
          <ReachSoreReceiptWaiting />
        </Tabs.TabPane>
        <Tabs.TabPane tab="已签收" key="2">
          <ReachStoreReceipted />
        </Tabs.TabPane>
      </Tabs>
    );
  },
);
