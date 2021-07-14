// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/project/cj/warehousenew/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/Loading';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/",
    "redirect": "/login"
  },
  {
    "path": "/login",
    "microApp": "login",
    "microAppProps": {
      "_props": {
        "platformName": "仓库中心",
        "platform": "5",
        "redirectUri": "/outBoundOrder",
        "path": "/login"
      }
    },
    "exact": false,
    "component": (() => {
          const { getMicroAppRouteComponent } = umiExports;
          return getMicroAppRouteComponent({ appName: 'login', base: '/', masterHistoryType: 'browser', routeProps: {'settings':{},'_props':{'platformName':'仓库中心','platform':'5','redirectUri':'/outBoundOrder','path':'/login'}} })
        })()
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/abnormalRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__abnormalRecords__index' */'@/pages/abnormalRecords/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-YSBZ005",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/batchManage/detail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__batchManage__detail__index' */'@/pages/batchManage/detail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/batchManage/detail2",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__batchManage__detail2__index' */'@/pages/batchManage/detail2/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/batchManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__batchManage__index' */'@/pages/batchManage/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-JHGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/cannibalize",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__cannibalize__index' */'@/pages/cannibalize/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-DDRW002",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/cannibalize/add",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__cannibalize__add__index' */'@/pages/cannibalize/add/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/containerManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__containerManage__index' */'@/pages/containerManage/index.tsx'), loading: LoadingComponent}),
        "code": "XTCD-RQGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/directSend",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__directSend__index' */'@/pages/directSend/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-YSBZ002",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/editPerformanceRule",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__editPerformanceRule__index' */'@/pages/editPerformanceRule/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/exceptionPurchase",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptionPurchase__index' */'@/pages/exceptionPurchase/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-YCCL006",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/exceptionRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptionRecords__index' */'@/pages/exceptionRecords/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-YCCL002",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/exceptionWarehouse",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptionWarehouse__index' */'@/pages/exceptionWarehouse/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-YCCL003",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/expenseAppreciation",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__expenseAppreciation__index' */'@/pages/expenseAppreciation/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/haveOutbound",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__haveOutbound__index' */'@/pages/haveOutbound/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD004",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/materialManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__materialManage__index' */'@/pages/materialManage/index.tsx'), loading: LoadingComponent}),
        "code": "XTCD-HCGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/minuteMarkManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__minuteMarkManage__index' */'@/pages/minuteMarkManage/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-FBGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/minuteMarkManage/normal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__minuteMarkManage__normal__index' */'@/pages/minuteMarkManage/normal/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/minuteMarkManage/pod",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__minuteMarkManage__pod__index' */'@/pages/minuteMarkManage/pod/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/moveInWarehouse",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__moveInWarehouse__index' */'@/pages/moveInWarehouse/index.tsx'), loading: LoadingComponent}),
        "code": "KCCD-KCYD001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/offsetRuleConfig",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__offsetRuleConfig__index' */'@/pages/offsetRuleConfig/index.tsx'), loading: LoadingComponent}),
        "code": "XTCD-DKGZ001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/orderDispatch/details",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__orderDispatch__details__index' */'@/pages/orderDispatch/details/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/orderDispatch",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__orderDispatch__index' */'@/pages/orderDispatch/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-DING001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/outBoundDetail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outBoundDetail__index' */'@/pages/outBoundDetail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/outboundException",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outboundException__index' */'@/pages/outboundException/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CKYC001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/outBoundOrder",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outBoundOrder__index' */'@/pages/outBoundOrder/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CKCX001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/outboundRecord/bagDetail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outboundRecord__bagDetail__index' */'@/pages/outboundRecord/bagDetail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/outboundRecord",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outboundRecord__index' */'@/pages/outboundRecord/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD007",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/outboundRecord/listDetail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__outboundRecord__listDetail__index' */'@/pages/outboundRecord/listDetail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/packagePrint",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packagePrint__index' */'@/pages/packagePrint/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD006",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/packageRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packageRecords__index' */'@/pages/packageRecords/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-YSBZ004",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/packageSign",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packageSign__index' */'@/pages/packageSign/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-BGQS001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/packageSign/signing",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packageSign__signing__index' */'@/pages/packageSign/signing/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/performanceConfig",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__performanceConfig__index' */'@/pages/performanceConfig/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-JXTJ003",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/performanceList",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__performanceList__index' */'@/pages/performanceList/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-JXTJ002",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/performanceList/performanceLog/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__performanceList__performanceLog__id' */'@/pages/performanceList/performanceLog/[id].tsx'), loading: LoadingComponent})
      },
      {
        "path": "/positionManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__positionManage__index' */'@/pages/positionManage/index.tsx'), loading: LoadingComponent}),
        "code": "XTCD-CWGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/proxySend",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__proxySend__index' */'@/pages/proxySend/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-YSBZ003",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/putawayDetail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__putawayDetail__index' */'@/pages/putawayDetail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/putawayManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__putawayManage__index' */'@/pages/putawayManage/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-SJGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/qualityManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__qualityManage__index' */'@/pages/qualityManage/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-ZJGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/qualityManage/normal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__qualityManage__normal__index' */'@/pages/qualityManage/normal/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/qualityManage/twoNormal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__qualityManage__twoNormal__index' */'@/pages/qualityManage/twoNormal/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/reachStoreReceipt",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reachStoreReceipt__index' */'@/pages/reachStoreReceipt/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-DCQS001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/reachStoreReceipt/receipt",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reachStoreReceipt__receipt__index' */'@/pages/reachStoreReceipt/receipt/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/soringManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__soringManage__index' */'@/pages/soringManage/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-FLGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/storeAdjust",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__storeAdjust__index' */'@/pages/storeAdjust/index.tsx'), loading: LoadingComponent}),
        "code": "KCCD-KCTZ001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/storeBoard",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__storeBoard__index' */'@/pages/storeBoard/index.tsx'), loading: LoadingComponent}),
        "code": "KCCD-KCKB001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/storeTransfer",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__storeTransfer__index' */'@/pages/storeTransfer/index.tsx'), loading: LoadingComponent}),
        "code": "KCCD-KCZZ001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/tallyManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__tallyManage__index' */'@/pages/tallyManage/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/tallyBatch",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__tallyBatch__index' */'@/pages/tallyBatch/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/surfacePlay",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__surfacePlay__index' */'@/pages/surfacePlay/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/tookOutbound",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__tookOutbound__index' */'@/pages/tookOutbound/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/waitingOutbound",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__waitingOutbound__index' */'@/pages/waitingOutbound/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD002",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/warehouseManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__warehouseManage__index' */'@/pages/warehouseManage/index.tsx'), loading: LoadingComponent}),
        "code": "XTCD-CQGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/warehouseWarrantDetail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__warehouseWarrantDetail__index' */'@/pages/warehouseWarrantDetail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/warehouseWarrantFinder",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__warehouseWarrantFinder__index' */'@/pages/warehouseWarrantFinder/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-RKCX001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/wavePickingManage/detail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__wavePickingManage__detail__index' */'@/pages/wavePickingManage/detail/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/wavePickingManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__wavePickingManage__index' */'@/pages/wavePickingManage/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-BCGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/weighingAbnormal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__weighingAbnormal__index' */'@/pages/weighingAbnormal/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD003",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/weighManage",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__weighManage__index' */'@/pages/weighManage/index.tsx'), loading: LoadingComponent}),
        "code": "RKCD-CZGL001",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/weighManage/normal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__weighManage__normal__index' */'@/pages/weighManage/normal/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/weightConfig",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__weightConfig__index' */'@/pages/weightConfig/index.tsx'), loading: LoadingComponent}),
        "code": "CKCD-CZCD005",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/wrappers/auth'), loading: LoadingComponent})]
      },
      {
        "path": "/offlineWeight",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__offlineWeight__index' */'@/pages/offlineWeight/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/shelfDetailRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__shelfDetailRecords__index' */'@/pages/shelfDetailRecords/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/packDetailRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packDetailRecords__index' */'@/pages/packDetailRecords/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/productDetail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__productDetail__id' */'@/pages/productDetail/[id].tsx'), loading: LoadingComponent})
      },
      {
        "path": "/librarylist",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__libraryList__index' */'@/pages/libraryList/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/librarylist/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__libraryList__id' */'@/pages/libraryList/[id].tsx'), loading: LoadingComponent})
      },
      {
        "path": "/librarylist/detail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__libraryList__detail__id' */'@/pages/libraryList/detail/[id].tsx'), loading: LoadingComponent})
      },
      {
        "path": "/signforRecords",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__signforRecords__index' */'@/pages/signforRecords/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/inventoryTurnOver",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__inventoryTurnover__index' */'@/pages/inventoryTurnover/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/wms/connect/:id",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'connect' */'D:/project/cj/warehousenew/src/connect'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/componentCenter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'componentCenter' */'D:/project/cj/warehousenew/src/componentCenter'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/inventoryList",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__inventoryList__index' */'@/pages/inventoryList/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/inventoryResult",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__inventoryResult__index' */'@/pages/inventoryResult/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/inventoryBatchNo",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__inventoryBatchNo__index' */'@/pages/inventoryBatchNo/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/packageReview",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__packageReview__index' */'@/pages/packageReview/index.tsx'), loading: LoadingComponent})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
