import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Tabs } from 'antd';
import style from '@/pages/exceptionPurchase/index.less';
import AbnormalOfLost from './abnormalOfLost';
import AbnormalOfExpress from './abnormalOfExpress';
import NoPermisson from '@/components/NoPermisson';
import { hasAuth } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '验货包装' },
  { name: '异常记录' },
])(() => {
  const isShowFirst: boolean = hasAuth(AUTH.CKCDYSBZ006); // 缺货异常
  const isShowSeconed: boolean = hasAuth(AUTH.CKCDYSBZ007); // 面单异常
  if (isShowFirst || isShowSeconed) {
    return (
      <Tabs
        defaultActiveKey="1"
        animated
        className={style['exception-purchase']}
      >
        {isShowFirst && (
          <Tabs.TabPane key="1" tab="缺货异常">
            <AbnormalOfLost />
          </Tabs.TabPane>
        )}
        {isShowSeconed && (
          <Tabs.TabPane key="2" tab="面单异常">
            <AbnormalOfExpress />
          </Tabs.TabPane>
        )}
      </Tabs>
    );
  }
  return <NoPermisson />;
});
