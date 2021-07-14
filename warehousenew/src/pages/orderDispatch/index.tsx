import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Tabs } from 'antd';
import style from './index.less';
import OrderDispatchWaiting from './orderDispatchWaiting';
import OrderDispatchPending from './orderDispatchPending';
import OrderDispatchProcessed from './orderDispatchProcessed';
import NoPermisson from '@/components/NoPermisson';
import { hasAuth } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '出库' }, { name: '订单调度' }])(
  () => {
    const isShowFirst: boolean = hasAuth(AUTH.CKCDDING002); // 未发货
    const isShowSeconed: boolean = hasAuth(AUTH.CKCDDING003); // 已发货
    const isShowThree: boolean = hasAuth(AUTH.CKCDDING004); // 已收货
    if (isShowFirst || isShowSeconed || isShowThree) {
      return (
        <Tabs defaultActiveKey="1" className={style.container}>
          {isShowFirst && (
            <Tabs.TabPane tab="未发货" key="1">
              <OrderDispatchWaiting />
            </Tabs.TabPane>
          )}
          {isShowSeconed && (
            <Tabs.TabPane tab="已发货" key="2">
              <OrderDispatchPending />
            </Tabs.TabPane>
          )}
          {isShowThree && (
            <Tabs.TabPane tab="已收货" key="3">
              <OrderDispatchProcessed />
            </Tabs.TabPane>
          )}
        </Tabs>
      );
    }

    return <NoPermisson />;
  },
);
