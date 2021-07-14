import { AUTH } from '~/authority';
import { getELinks } from '@cckj/cj-authority';
import { AuthType, ELink } from '@cckj/cj-authority/dist/auth';

export type MenuConfig = Array<{
  name: string;
  key?: string;
  url?: string;
  code?: string;
  isELink?: boolean;
  children?: MenuConfig;
}>;
export default () =>
  [
    {
      name: '库存管理',
      key: 'inventory',
      code: AUTH.CKZXKCCD001,
      children: [
        { url: '/storeBoard', name: '库存看板', code: AUTH.KCCDKCKB001 },
        { url: '/moveInWarehouse', name: '库内移动', code: AUTH.KCCDKCYD001 },
        { url: '/storeTransfer', name: '库存转移', code: AUTH.KCCDKCZZ001 },
        { url: '/storeAdjust', name: '库存调整', code: AUTH.KCCDKCTZ001 },
        // { url: '/inventoryTurnOver', name: '库存周转率' },
        { url: '/tallyManage', name: '理货管理' },
        { url: '/tallyBatch', name: '理货批次' },
      ],
    },
    {
      name: '系统管理',
      key: 'system',
      code: AUTH.CKZXXTCD001,
      children: [
        { url: '/warehouseManage', name: '库区管理', code: AUTH.XTCDCQGL001 },
        { url: '/positionManage', name: '库位管理', code: AUTH.XTCDCWGL001 },
        { url: '/containerManage', name: '容器管理', code: AUTH.XTCDRQGL001 },
        {
          url: '/offsetRuleConfig',
          name: '抵扣规则配置',
          code: AUTH.XTCDDKGZ001,
        },
        { url: '/materialManage', name: '耗材管理', code: AUTH.XTCDHCGL001 },
        {
          name: '绩效统计',
          code: AUTH.CKCDJXTJ001,
          children: [
            {
              url: '/performanceList',
              name: '绩效列表',
              code: AUTH.CKCDJXTJ002,
            },
            {
              url: '/performanceConfig',
              name: '绩效规则配置',
              code: AUTH.CKCDJXTJ003,
            },
          ],
        },
      ],
    },
    {
      name: '库存盘点',
      key: 'checkInventory',
      children: [
        { url: '/inventoryList', name: '盘点单' },
        { url: '/inventoryBatchNo', name: '盘点批次' },
        { url: '/inventoryResult', name: '盘点结果' },
      ],
    },
    {
      name: '入库',
      key: 'putInStorage',
      code: AUTH.CXZXRKCD001,
      children: [
        {
          url: '/warehouseWarrantFinder',
          name: '入库单查询',
          code: AUTH.RKCDRKCX001,
        },
        { url: '/packageSign', name: '包裹签收', code: AUTH.RKCDBGQS001 },
        { url: '/minuteMarkManage', name: '分标管理', code: AUTH.RKCDFBGL001 },
        { url: '/qualityManage', name: '质检管理', code: AUTH.RKCDZJGL001 },
        { url: '/weighManage', name: '称重管理', code: AUTH.RKCDCZGL001 },
        { url: '/putawayManage', name: '上架管理', code: AUTH.RKCDSJGL001 },
        { url: '/shelfDetailRecords', name: '上架明细记录' },
        { url: '/signforRecords', name: '签收扫描记录' },
        {
          name: '异常处理',
          code: AUTH.RKCDYCCL001,
          children: [
            {
              url: '/exceptionRecords',
              name: '异常记录',
              code: AUTH.RKCDYCCL002,
            },
            {
              url: '/exceptionWarehouse',
              name: '入库异常单',
              code: AUTH.RKCDYCCL003,
            },
            {
              url: '/exceptionPurchase',
              name: '采购入库异常单',
              code: AUTH.RKCDYCCL006,
            },
          ],
        },
      ],
    },
    {
      name: '出库',
      key: 'outbound',
      code: AUTH.CKZXCKCD001,
      children: [
        { url: '/outBoundOrder', name: '出库单查询', code: AUTH.CKCDCKCX001 },
        { url: '/wavePickingManage', name: '波次管理', code: AUTH.CKCDBCGL001 },
        { url: '/batchManage', name: '拣货管理', code: AUTH.CKCDJHGL001 },
        { url: '/soringManage', name: '分拣管理', code: AUTH.CKCDFLGL001 },
        { url: '/outboundException', name: '出库异常', code: AUTH.CKCDCKYC001 },
        // { url: '/surfacePlay', name: '面单补打' },
        { url: '/packDetailRecords', name: '打包明细记录' },
        {
          name: '验货包装',
          code: AUTH.CKCDYSBZ001,
          children: [
            { url: '/directSend', name: '直发单', code: AUTH.CKCDYSBZ002 },
            { url: '/proxySend', name: '代发单', code: AUTH.CKCDYSBZ003 },
            { url: '/packageReview', name: '打包复核' },
            {
              url: '/packageRecords',
              name: '打包记录',
              code: AUTH.CKCDYSBZ004,
            },
            {
              url: '/abnormalRecords',
              name: '异常记录',
              code: AUTH.CKCDYSBZ005,
            },
          ],
        },
        {
          name: '称重',
          code: AUTH.CKCDCZCD001,
          children: [
            {
              url: '/waitingOutbound',
              name: '等待出库',
              code: AUTH.CKCDCZCD002,
            },
            {
              url: '/weighingAbnormal',
              name: '称重异常',
              code: AUTH.CKCDCZCD003,
            },
            { url: '/haveOutbound', name: '已出库', code: AUTH.CKCDCZCD004 },
            { url: '/weightConfig', name: '配置', code: AUTH.CKCDCZCD005 },
            { url: '/packagePrint', name: '包裹打印', code: AUTH.CKCDCZCD006 },
            // { url: '/tookOutbound', name: '揽收出库' },
            {
              url: '/outboundRecord',
              name: '揽收记录',
              code: AUTH.CKCDCZCD007,
            },
          ],
        },
        {
          name: '调度任务',
          code: AUTH.CKCDDDRW001,
          children: [
            { url: '/cannibalize', name: '调拨出库单', code: AUTH.CKCDDDRW002 },
            { url: '/orderDispatch', name: '订单调度', code: AUTH.CKCDDING001 },
            {
              url: '/reachStoreReceipt',
              name: '到达仓签收',
              code: AUTH.CKCDDCQS001,
            },
          ],
        },
      ],
    },
    {
      name: '越库管理',
      key: 'library',
      children: [{ url: '/libraryList', name: '越库看板' }],
    },
    ...eLinkFactory(),
  ] as MenuConfig;

const eLinkFactory = () => {
  const fun: Function = (child: ELink[] | undefined) => {
    return (child || []).map(c => {
      // let url;
      // if (c.authType == AuthType.erp) {
      //   url =
      //     c.children && c.children.length > 0
      //       ? undefined
      //       : `/wms/connect/${c.code}`;
      // } else if (c.authType == AuthType.micro && c.href) {
      //   url =
      //     c.children && c.children.length > 0
      //       ? undefined
      //       : `/componentCenter/${c.href}`;
      // }

      return {
        name: c.name,
        isELink: true,
        // url: url,
        url:
          c.children && c.children.length > 0
            ? undefined
            : `/wms/connect/${c.code}`,
        children: fun(c.children),
      };
    });
  };
  return fun(getELinks());
};
