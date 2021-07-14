import React from 'react';
import { Tabs } from 'antd';
import Pending from './pending';
import Processed from './processed';
import Dealing from './dealing';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import NoPermisson from '@/components/NoPermisson';
import { hasAuth } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import style from './index.less';

export default BreadcrumbHeader([{ name: '入库' }, { name: '采购入库异常单' }])(
  () => {
    const isShowFirst: boolean = hasAuth(AUTH.RKCDYCCL007); // 待处理
    const isShowSeconed: boolean = hasAuth(AUTH.RKCDYCCL008); // 处理中
    const isShowThree: boolean = hasAuth(AUTH.RKCDYCCL009); // 已处理
    if (isShowFirst || isShowSeconed || isShowThree) {
      return (
        <Tabs
          defaultActiveKey="1"
          animated
          className={style['exception-purchase']}
        >
          {isShowFirst && (
            <Tabs.TabPane key="1" tab="待处理">
              <Pending />
            </Tabs.TabPane>
          )}
          {isShowSeconed && (
            <Tabs.TabPane key="2" tab="处理中">
              <Dealing />
            </Tabs.TabPane>
          )}
          {isShowThree && (
            <Tabs.TabPane key="3" tab="已处理">
              <Processed />
            </Tabs.TabPane>
          )}
        </Tabs>
      );
    }
    return <NoPermisson />;
  },
);
