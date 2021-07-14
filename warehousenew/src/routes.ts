import { AUTH } from '../authority';

export default [
  { exact: true, path: '/', redirect: '/login' },
  {
    path: '/login',
    microApp: 'login',
    microAppProps: {
      _props: {
        platformName: '仓库中心',
        platform: '5',
        redirectUri: '/outBoundOrder',
        path: '/login',
      },
    },
  },
  {
    component: '@/layouts/index.tsx',
    routes: [
      {
        path: '/abnormalRecords',
        exact: true,
        component: '@/pages/abnormalRecords/index.tsx',
        code: AUTH.CKCDYSBZ005,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/batchManage/detail',
        exact: true,
        component: '@/pages/batchManage/detail/index.tsx',
      },
      {
        path: '/batchManage/detail2',
        exact: true,
        component: '@/pages/batchManage/detail2/index.tsx',
      },
      {
        path: '/batchManage',
        exact: true,
        component: '@/pages/batchManage/index.tsx',
        code: AUTH.CKCDJHGL001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/cannibalize',
        exact: true,
        component: '@/pages/cannibalize/index.tsx',
        code: AUTH.CKCDDDRW002,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/cannibalize/add',
        exact: true,
        component: '@/pages/cannibalize/add/index.tsx',
      },

      {
        path: '/containerManage',
        exact: true,
        component: '@/pages/containerManage/index.tsx',
        code: AUTH.XTCDRQGL001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/directSend',
        exact: true,
        component: '@/pages/directSend/index.tsx',
        code: AUTH.CKCDYSBZ002,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/editPerformanceRule',
        exact: true,
        component: '@/pages/editPerformanceRule/index.tsx',
      },

      {
        path: '/exceptionPurchase',
        exact: true,
        component: '@/pages/exceptionPurchase/index.tsx',
        code: AUTH.RKCDYCCL006,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/exceptionRecords',
        exact: true,
        component: '@/pages/exceptionRecords/index.tsx',
        code: AUTH.RKCDYCCL002,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/exceptionWarehouse',
        exact: true,
        component: '@/pages/exceptionWarehouse/index.tsx',
        code: AUTH.RKCDYCCL003,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/expenseAppreciation',
        exact: true,
        component: '@/pages/expenseAppreciation/index.tsx',
      },

      {
        path: '/haveOutbound',
        exact: true,
        component: '@/pages/haveOutbound/index.tsx',
        code: AUTH.CKCDCZCD004,
        wrappers: ['@/wrappers/auth'],
      },

      { path: '/', exact: true, component: '@/pages/index.tsx' },
      {
        path: '/materialManage',
        exact: true,
        component: '@/pages/materialManage/index.tsx',
        code: AUTH.XTCDHCGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/minuteMarkManage',
        exact: true,
        component: '@/pages/minuteMarkManage/index.tsx',
        code: AUTH.RKCDFBGL001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/minuteMarkManage/normal',
        exact: true,
        component: '@/pages/minuteMarkManage/normal/index.tsx',
      },
      {
        path: '/minuteMarkManage/pod',
        exact: true,
        component: '@/pages/minuteMarkManage/pod/index.tsx',
      },
      {
        path: '/moveInWarehouse',
        exact: true,
        component: '@/pages/moveInWarehouse/index.tsx',
        code: AUTH.KCCDKCYD001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/offsetRuleConfig',
        exact: true,
        component: '@/pages/offsetRuleConfig/index.tsx',
        code: AUTH.XTCDDKGZ001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/orderDispatch/details',
        exact: true,
        component: '@/pages/orderDispatch/details/index.tsx',
      },
      {
        path: '/orderDispatch',
        exact: true,
        component: '@/pages/orderDispatch/index.tsx',
        code: AUTH.CKCDDING001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/outBoundDetail',
        exact: true,
        component: '@/pages/outBoundDetail/index.tsx',
      },
      {
        path: '/outboundException',
        exact: true,
        component: '@/pages/outboundException/index.tsx',
        code: AUTH.CKCDCKYC001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/outBoundOrder',
        exact: true,
        component: '@/pages/outBoundOrder/index.tsx',
        code: AUTH.CKCDCKCX001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/outboundRecord/bagDetail',
        exact: true,
        component: '@/pages/outboundRecord/bagDetail/index.tsx',
      },

      {
        path: '/outboundRecord',
        exact: true,
        component: '@/pages/outboundRecord/index.tsx',
        code: AUTH.CKCDCZCD007,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/outboundRecord/listDetail',
        exact: true,
        component: '@/pages/outboundRecord/listDetail/index.tsx',
      },

      {
        path: '/packagePrint',
        exact: true,
        component: '@/pages/packagePrint/index.tsx',
        code: AUTH.CKCDCZCD006,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/packageRecords',
        exact: true,
        component: '@/pages/packageRecords/index.tsx',
        code: AUTH.CKCDYSBZ004,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/packageSign',
        exact: true,
        component: '@/pages/packageSign/index.tsx',
        code: AUTH.RKCDBGQS001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/packageSign/signing',
        exact: true,
        component: '@/pages/packageSign/signing/index.tsx',
      },

      {
        path: '/performanceConfig',
        exact: true,
        component: '@/pages/performanceConfig/index.tsx',
        code: AUTH.CKCDJXTJ003,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/performanceList',
        exact: true,
        component: '@/pages/performanceList/index.tsx',
        code: AUTH.CKCDJXTJ002,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/performanceList/performanceLog/:id',
        exact: true,
        component: '@/pages/performanceList/performanceLog/[id].tsx',
      },

      {
        path: '/positionManage',
        exact: true,
        component: '@/pages/positionManage/index.tsx',
        code: AUTH.XTCDCWGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/proxySend',
        exact: true,
        component: '@/pages/proxySend/index.tsx',
        code: AUTH.CKCDYSBZ003,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/putawayDetail',
        exact: true,
        component: '@/pages/putawayDetail/index.tsx',
      },
      {
        path: '/putawayManage',
        exact: true,
        component: '@/pages/putawayManage/index.tsx',
        code: AUTH.RKCDSJGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/qualityManage',
        exact: true,
        component: '@/pages/qualityManage/index.tsx',
        code: AUTH.RKCDZJGL001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/qualityManage/normal',
        exact: true,
        component: '@/pages/qualityManage/normal/index.tsx',
      },
      {
        path: '/qualityManage/twoNormal',
        exact: true,
        component: '@/pages/qualityManage/twoNormal/index.tsx',
      },

      {
        path: '/reachStoreReceipt',
        exact: true,
        component: '@/pages/reachStoreReceipt/index.tsx',
        code: AUTH.CKCDDCQS001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/reachStoreReceipt/receipt',
        exact: true,
        component: '@/pages/reachStoreReceipt/receipt/index.tsx',
      },
      {
        path: '/soringManage',
        exact: true,
        component: '@/pages/soringManage/index.tsx',
        code: AUTH.CKCDFLGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/storeAdjust',
        exact: true,
        component: '@/pages/storeAdjust/index.tsx',
        code: AUTH.KCCDKCTZ001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/storeBoard',
        exact: true,
        component: '@/pages/storeBoard/index.tsx',
        code: AUTH.KCCDKCKB001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/storeTransfer',
        exact: true,
        component: '@/pages/storeTransfer/index.tsx',
        code: AUTH.KCCDKCZZ001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/tallyManage',
        exact: true,
        component: '@/pages/tallyManage/index.tsx',
      },
      {
        path: '/tallyBatch',
        exact: true,
        component: '@/pages/tallyBatch/index.tsx',
      },
      {
        path: '/surfacePlay',
        exact: true,
        component: '@/pages/surfacePlay/index.tsx',
      },
      {
        path: '/tookOutbound',
        exact: true,
        component: '@/pages/tookOutbound/index.tsx',
      },
      {
        path: '/waitingOutbound',
        exact: true,
        component: '@/pages/waitingOutbound/index.tsx',
        code: AUTH.CKCDCZCD002,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/warehouseManage',
        exact: true,
        component: '@/pages/warehouseManage/index.tsx',
        code: AUTH.XTCDCQGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/warehouseWarrantDetail',
        exact: true,
        component: '@/pages/warehouseWarrantDetail/index.tsx',
      },
      {
        path: '/warehouseWarrantFinder',
        exact: true,
        component: '@/pages/warehouseWarrantFinder/index.tsx',
        code: AUTH.RKCDRKCX001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/wavePickingManage/detail',
        exact: true,
        component: '@/pages/wavePickingManage/detail/index.tsx',
      },
      {
        path: '/wavePickingManage',
        exact: true,
        component: '@/pages/wavePickingManage/index.tsx',
        code: AUTH.CKCDBCGL001,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/weighingAbnormal',
        exact: true,
        component: '@/pages/weighingAbnormal/index.tsx',
        code: AUTH.CKCDCZCD003,
        wrappers: ['@/wrappers/auth'],
      },

      {
        path: '/weighManage',
        exact: true,
        component: '@/pages/weighManage/index.tsx',
        code: AUTH.RKCDCZGL001,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/weighManage/normal',
        exact: true,
        component: '@/pages/weighManage/normal/index.tsx',
      },

      {
        path: '/weightConfig',
        exact: true,
        component: '@/pages/weightConfig/index.tsx',
        code: AUTH.CKCDCZCD005,
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/offlineWeight',
        exact: true,
        component: '@/pages/offlineWeight/index.tsx',
      },
      {
        path: '/shelfDetailRecords',
        exact: true,
        component: '@/pages/shelfDetailRecords/index.tsx',
      },
      {
        path: '/packDetailRecords',
        exact: true,
        component: '@/pages/packDetailRecords/index.tsx',
      },
      {
        path: '/productDetail/:id',
        exact: true,
        component: '@/pages/productDetail/[id].tsx',
      },
      {
        path: '/librarylist',
        exact: true,
        component: '@/pages/libraryList/index.tsx',
      },
      {
        path: '/librarylist/:id',
        exact: true,
        component: '@/pages/libraryList/[id].tsx',
      },
      {
        path: '/librarylist/detail/:id',
        exact: true,
        component: '@/pages/libraryList/detail/[id].tsx',
      },
      {
        path: '/signforRecords',
        exact: true,
        component: '@/pages/signforRecords/index.tsx',
      },
      {
        path: '/inventoryTurnOver',
        exact: true,
        component: '@/pages/inventoryTurnover/index.tsx',
      },
      {
        path: '/wms/connect/:id',
        component: '../connect',
      },
      {
        path: '/componentCenter',
        component: '../componentCenter',
      },
      {
        path: '/inventoryList',
        exact: true,
        component: '@/pages/inventoryList/index.tsx',
      },

      {
        path: '/inventoryResult',
        exact: true,
        component: '@/pages/inventoryResult/index.tsx',
      },

      {
        path: '/inventoryBatchNo',
        exact: true,
        component: '@/pages/inventoryBatchNo/index.tsx',
      },

      {
        path: '/packageReview',
        exact: true,
        component: '@/pages/packageReview/index.tsx',
      },
    ],
  },
];
