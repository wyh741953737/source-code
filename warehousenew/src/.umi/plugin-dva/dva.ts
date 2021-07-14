// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/project/cj/warehousenew/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelAbnormalOfExpress0 from 'D:/project/cj/warehousenew/src/models/abnormalOfExpress.ts';
import ModelAbnormalOfLost1 from 'D:/project/cj/warehousenew/src/models/abnormalOfLost.ts';
import ModelBagDetail2 from 'D:/project/cj/warehousenew/src/models/bagDetail.ts';
import ModelBatchManage3 from 'D:/project/cj/warehousenew/src/models/batchManage.ts';
import ModelCannibalize4 from 'D:/project/cj/warehousenew/src/models/cannibalize.ts';
import ModelCommon5 from 'D:/project/cj/warehousenew/src/models/common.ts';
import ModelContainerManage6 from 'D:/project/cj/warehousenew/src/models/containerManage.ts';
import ModelExceptionPurchaseDealing7 from 'D:/project/cj/warehousenew/src/models/exceptionPurchaseDealing.ts';
import ModelExceptionPurchasePending8 from 'D:/project/cj/warehousenew/src/models/exceptionPurchasePending.ts';
import ModelExceptionPurchaseProcessed9 from 'D:/project/cj/warehousenew/src/models/exceptionPurchaseProcessed.ts';
import ModelExceptionRecords10 from 'D:/project/cj/warehousenew/src/models/exceptionRecords.ts';
import ModelExceptionWarehouseAborted11 from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseAborted.ts';
import ModelExceptionWarehouseDealing12 from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseDealing.ts';
import ModelExceptionWarehousePending13 from 'D:/project/cj/warehousenew/src/models/exceptionWarehousePending.ts';
import ModelExceptionWarehouseProcessed14 from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseProcessed.ts';
import ModelExpenseAppreciation15 from 'D:/project/cj/warehousenew/src/models/expenseAppreciation.ts';
import ModelFirstStore16 from 'D:/project/cj/warehousenew/src/models/firstStore.ts';
import ModelHaveOutbound17 from 'D:/project/cj/warehousenew/src/models/haveOutbound.ts';
import ModelInventoryBatchNo18 from 'D:/project/cj/warehousenew/src/models/inventoryBatchNo.ts';
import ModelInventoryList19 from 'D:/project/cj/warehousenew/src/models/inventoryList.ts';
import ModelInventoryResult20 from 'D:/project/cj/warehousenew/src/models/inventoryResult.ts';
import ModelLibararyListItem21 from 'D:/project/cj/warehousenew/src/models/libararyListItem.ts';
import ModelLibraryList22 from 'D:/project/cj/warehousenew/src/models/libraryList.ts';
import ModelLibraryListDetail23 from 'D:/project/cj/warehousenew/src/models/libraryListDetail.ts';
import ModelListDetail24 from 'D:/project/cj/warehousenew/src/models/listDetail.ts';
import ModelMaterialManage25 from 'D:/project/cj/warehousenew/src/models/materialManage.ts';
import ModelMinuteMarkManage26 from 'D:/project/cj/warehousenew/src/models/minuteMarkManage.ts';
import ModelMoveInWarehouse27 from 'D:/project/cj/warehousenew/src/models/moveInWarehouse.ts';
import ModelOffsetRuleConfig28 from 'D:/project/cj/warehousenew/src/models/offsetRuleConfig.ts';
import ModelOrderDispatchPending29 from 'D:/project/cj/warehousenew/src/models/orderDispatchPending.ts';
import ModelOrderDispatchProcessed30 from 'D:/project/cj/warehousenew/src/models/orderDispatchProcessed.ts';
import ModelOrderDispatchWaiting31 from 'D:/project/cj/warehousenew/src/models/orderDispatchWaiting.ts';
import ModelOutboundException32 from 'D:/project/cj/warehousenew/src/models/outboundException.ts';
import ModelOutBoundOrder33 from 'D:/project/cj/warehousenew/src/models/outBoundOrder.ts';
import ModelOutboundRecord34 from 'D:/project/cj/warehousenew/src/models/outboundRecord.ts';
import ModelOverProduct35 from 'D:/project/cj/warehousenew/src/models/overProduct.ts';
import ModelOverSku36 from 'D:/project/cj/warehousenew/src/models/overSku.ts';
import ModelPackagePrint37 from 'D:/project/cj/warehousenew/src/models/packagePrint.ts';
import ModelPackageRecords38 from 'D:/project/cj/warehousenew/src/models/packageRecords.ts';
import ModelPackageSigned39 from 'D:/project/cj/warehousenew/src/models/packageSigned.ts';
import ModelPackageUnSign40 from 'D:/project/cj/warehousenew/src/models/packageUnSign.ts';
import ModelPackDetailRecords41 from 'D:/project/cj/warehousenew/src/models/packDetailRecords.ts';
import ModelPerformanceConfig42 from 'D:/project/cj/warehousenew/src/models/performanceConfig.ts';
import ModelPerformanceList43 from 'D:/project/cj/warehousenew/src/models/performanceList.ts';
import ModelPerformanceLog44 from 'D:/project/cj/warehousenew/src/models/performanceLog.ts';
import ModelPositionManage45 from 'D:/project/cj/warehousenew/src/models/positionManage.ts';
import ModelPutawayManage46 from 'D:/project/cj/warehousenew/src/models/putawayManage.ts';
import ModelQualityManage47 from 'D:/project/cj/warehousenew/src/models/qualityManage.ts';
import ModelReachSoreReceiptWaiting48 from 'D:/project/cj/warehousenew/src/models/reachSoreReceiptWaiting.ts';
import ModelReachStoreReceipted49 from 'D:/project/cj/warehousenew/src/models/reachStoreReceipted.ts';
import ModelSecondStore50 from 'D:/project/cj/warehousenew/src/models/secondStore.ts';
import ModelShelfDetailRecords51 from 'D:/project/cj/warehousenew/src/models/shelfDetailRecords.ts';
import ModelSignforRecords52 from 'D:/project/cj/warehousenew/src/models/signforRecords.ts';
import ModelSoringManage53 from 'D:/project/cj/warehousenew/src/models/soringManage.ts';
import ModelStoreAdjust54 from 'D:/project/cj/warehousenew/src/models/storeAdjust.ts';
import ModelStoreRecords55 from 'D:/project/cj/warehousenew/src/models/storeRecords.ts';
import ModelStoreTransfer56 from 'D:/project/cj/warehousenew/src/models/storeTransfer.ts';
import ModelTallyBatch57 from 'D:/project/cj/warehousenew/src/models/tallyBatch.ts';
import ModelTallyManage58 from 'D:/project/cj/warehousenew/src/models/tallyManage.ts';
import ModelThirdStore59 from 'D:/project/cj/warehousenew/src/models/thirdStore.ts';
import ModelTookOutbound60 from 'D:/project/cj/warehousenew/src/models/tookOutbound.ts';
import ModelWaitingOutbound61 from 'D:/project/cj/warehousenew/src/models/waitingOutbound.ts';
import ModelWarehouseManage62 from 'D:/project/cj/warehousenew/src/models/warehouseManage.ts';
import ModelWarehouseWarrantDetail63 from 'D:/project/cj/warehousenew/src/models/warehouseWarrantDetail.ts';
import ModelWarehouseWarrantFinder64 from 'D:/project/cj/warehousenew/src/models/warehouseWarrantFinder.ts';
import ModelWavePickingManage65 from 'D:/project/cj/warehousenew/src/models/wavePickingManage.ts';
import ModelWeighingAbnormal66 from 'D:/project/cj/warehousenew/src/models/weighingAbnormal.ts';
import ModelWeighManage67 from 'D:/project/cj/warehousenew/src/models/weighManage.ts';
import ModelWeightConfig68 from 'D:/project/cj/warehousenew/src/models/weightConfig.ts';
import dvaImmer, { enableES5, enableAllPlugins } from 'D:/project/cj/warehousenew/node_modules/dva-immer/dist/index.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  app.use(dvaImmer());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'abnormalOfExpress', ...ModelAbnormalOfExpress0 });
app.model({ namespace: 'abnormalOfLost', ...ModelAbnormalOfLost1 });
app.model({ namespace: 'bagDetail', ...ModelBagDetail2 });
app.model({ namespace: 'batchManage', ...ModelBatchManage3 });
app.model({ namespace: 'cannibalize', ...ModelCannibalize4 });
app.model({ namespace: 'common', ...ModelCommon5 });
app.model({ namespace: 'containerManage', ...ModelContainerManage6 });
app.model({ namespace: 'exceptionPurchaseDealing', ...ModelExceptionPurchaseDealing7 });
app.model({ namespace: 'exceptionPurchasePending', ...ModelExceptionPurchasePending8 });
app.model({ namespace: 'exceptionPurchaseProcessed', ...ModelExceptionPurchaseProcessed9 });
app.model({ namespace: 'exceptionRecords', ...ModelExceptionRecords10 });
app.model({ namespace: 'exceptionWarehouseAborted', ...ModelExceptionWarehouseAborted11 });
app.model({ namespace: 'exceptionWarehouseDealing', ...ModelExceptionWarehouseDealing12 });
app.model({ namespace: 'exceptionWarehousePending', ...ModelExceptionWarehousePending13 });
app.model({ namespace: 'exceptionWarehouseProcessed', ...ModelExceptionWarehouseProcessed14 });
app.model({ namespace: 'expenseAppreciation', ...ModelExpenseAppreciation15 });
app.model({ namespace: 'firstStore', ...ModelFirstStore16 });
app.model({ namespace: 'haveOutbound', ...ModelHaveOutbound17 });
app.model({ namespace: 'inventoryBatchNo', ...ModelInventoryBatchNo18 });
app.model({ namespace: 'inventoryList', ...ModelInventoryList19 });
app.model({ namespace: 'inventoryResult', ...ModelInventoryResult20 });
app.model({ namespace: 'libararyListItem', ...ModelLibararyListItem21 });
app.model({ namespace: 'libraryList', ...ModelLibraryList22 });
app.model({ namespace: 'libraryListDetail', ...ModelLibraryListDetail23 });
app.model({ namespace: 'listDetail', ...ModelListDetail24 });
app.model({ namespace: 'materialManage', ...ModelMaterialManage25 });
app.model({ namespace: 'minuteMarkManage', ...ModelMinuteMarkManage26 });
app.model({ namespace: 'moveInWarehouse', ...ModelMoveInWarehouse27 });
app.model({ namespace: 'offsetRuleConfig', ...ModelOffsetRuleConfig28 });
app.model({ namespace: 'orderDispatchPending', ...ModelOrderDispatchPending29 });
app.model({ namespace: 'orderDispatchProcessed', ...ModelOrderDispatchProcessed30 });
app.model({ namespace: 'orderDispatchWaiting', ...ModelOrderDispatchWaiting31 });
app.model({ namespace: 'outboundException', ...ModelOutboundException32 });
app.model({ namespace: 'outBoundOrder', ...ModelOutBoundOrder33 });
app.model({ namespace: 'outboundRecord', ...ModelOutboundRecord34 });
app.model({ namespace: 'overProduct', ...ModelOverProduct35 });
app.model({ namespace: 'overSku', ...ModelOverSku36 });
app.model({ namespace: 'packagePrint', ...ModelPackagePrint37 });
app.model({ namespace: 'packageRecords', ...ModelPackageRecords38 });
app.model({ namespace: 'packageSigned', ...ModelPackageSigned39 });
app.model({ namespace: 'packageUnSign', ...ModelPackageUnSign40 });
app.model({ namespace: 'packDetailRecords', ...ModelPackDetailRecords41 });
app.model({ namespace: 'performanceConfig', ...ModelPerformanceConfig42 });
app.model({ namespace: 'performanceList', ...ModelPerformanceList43 });
app.model({ namespace: 'performanceLog', ...ModelPerformanceLog44 });
app.model({ namespace: 'positionManage', ...ModelPositionManage45 });
app.model({ namespace: 'putawayManage', ...ModelPutawayManage46 });
app.model({ namespace: 'qualityManage', ...ModelQualityManage47 });
app.model({ namespace: 'reachSoreReceiptWaiting', ...ModelReachSoreReceiptWaiting48 });
app.model({ namespace: 'reachStoreReceipted', ...ModelReachStoreReceipted49 });
app.model({ namespace: 'secondStore', ...ModelSecondStore50 });
app.model({ namespace: 'shelfDetailRecords', ...ModelShelfDetailRecords51 });
app.model({ namespace: 'signforRecords', ...ModelSignforRecords52 });
app.model({ namespace: 'soringManage', ...ModelSoringManage53 });
app.model({ namespace: 'storeAdjust', ...ModelStoreAdjust54 });
app.model({ namespace: 'storeRecords', ...ModelStoreRecords55 });
app.model({ namespace: 'storeTransfer', ...ModelStoreTransfer56 });
app.model({ namespace: 'tallyBatch', ...ModelTallyBatch57 });
app.model({ namespace: 'tallyManage', ...ModelTallyManage58 });
app.model({ namespace: 'thirdStore', ...ModelThirdStore59 });
app.model({ namespace: 'tookOutbound', ...ModelTookOutbound60 });
app.model({ namespace: 'waitingOutbound', ...ModelWaitingOutbound61 });
app.model({ namespace: 'warehouseManage', ...ModelWarehouseManage62 });
app.model({ namespace: 'warehouseWarrantDetail', ...ModelWarehouseWarrantDetail63 });
app.model({ namespace: 'warehouseWarrantFinder', ...ModelWarehouseWarrantFinder64 });
app.model({ namespace: 'wavePickingManage', ...ModelWavePickingManage65 });
app.model({ namespace: 'weighingAbnormal', ...ModelWeighingAbnormal66 });
app.model({ namespace: 'weighManage', ...ModelWeighManage67 });
app.model({ namespace: 'weightConfig', ...ModelWeightConfig68 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
