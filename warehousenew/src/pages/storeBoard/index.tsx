import React from 'react';
import { Tabs } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import NoPermisson from '@/components/NoPermisson';
import { hasAuth } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import style from './index.less';
import FirstStore from './firstStore';
import SecondStore from './secondStore';
import ThirdStore from './thirdStore';
import StoreRecords from './storeRecords';

export default BreadcrumbHeader([{ name: '库存管理' }, { name: '库存看板' }])(
  () => {
    const isShowFirst: boolean = hasAuth(AUTH.KCCDKCKB002); // 一级库存
    const isShowSeconed: boolean = hasAuth(AUTH.KCCDKCKB003); // 二级库存
    const isShowThree: boolean = hasAuth(AUTH.KCCDKCKB004); // 三级库存
    const isShowFour: boolean = hasAuth(AUTH.KCCDKCKB005); // 库存流水
    if (isShowFirst || isShowSeconed || isShowThree || isShowFour) {
      return (
        <Tabs defaultActiveKey="1" animated className={style['store-board']}>
          {!isShowFirst && (
            <Tabs.TabPane key="1" tab="一级库存">
              <FirstStore />
            </Tabs.TabPane>
          )}
          {!isShowSeconed && (
            <Tabs.TabPane key="2" tab="二级库存">
              <SecondStore />
            </Tabs.TabPane>
          )}
          {isShowThree && (
            <Tabs.TabPane key="3" tab="三级库存">
              <ThirdStore />
            </Tabs.TabPane>
          )}
          {isShowFour && (
            <Tabs.TabPane key="4" tab="库存流水">
              <StoreRecords />
            </Tabs.TabPane>
          )}
        </Tabs>
      );
    }

    return <NoPermisson />;
  },
);
