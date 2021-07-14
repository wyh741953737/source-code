import React from 'react';
import { Tabs } from 'antd';
import UnSign from './unSign';
import Signed from './signed';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';

export default BreadcrumbHeader([{ name: '入库' }, { name: '包裹签收' }])(
  () => {
    return (
      <Tabs defaultActiveKey="1" animated className={style['package-sign']}>
        <Tabs.TabPane key="1" tab="待签收">
          <UnSign />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="已签收">
          <Signed />
        </Tabs.TabPane>
      </Tabs>
    );
  },
);
