import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Tabs } from 'antd';
import style from '@/pages/exceptionPurchase/index.less';
import OverSku from './overSku';
import OverProduct from './overProduct';

export default BreadcrumbHeader([{ name: '库存管理' }, { name: '库存周转率' }])(
  ({ ...props }) => {
    return (
      <Tabs
        defaultActiveKey="1"
        animated
        className={style['exception-purchase']}
      >
        <Tabs.TabPane key="1" tab="SKU">
          <OverSku />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="商品">
          <OverProduct />
        </Tabs.TabPane>
      </Tabs>
    );
  },
);
