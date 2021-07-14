// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from 'D:/project/cj/warehousenew/src/models/abnormalOfExpress';
export * from 'D:/project/cj/warehousenew/src/models/abnormalOfLost';
export * from 'D:/project/cj/warehousenew/src/models/bagDetail';
export * from 'D:/project/cj/warehousenew/src/models/batchManage';
export * from 'D:/project/cj/warehousenew/src/models/cannibalize';
export * from 'D:/project/cj/warehousenew/src/models/common';
export * from 'D:/project/cj/warehousenew/src/models/containerManage';
export * from 'D:/project/cj/warehousenew/src/models/exceptionPurchaseDealing';
export * from 'D:/project/cj/warehousenew/src/models/exceptionPurchasePending';
export * from 'D:/project/cj/warehousenew/src/models/exceptionPurchaseProcessed';
export * from 'D:/project/cj/warehousenew/src/models/exceptionRecords';
export * from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseAborted';
export * from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseDealing';
export * from 'D:/project/cj/warehousenew/src/models/exceptionWarehousePending';
export * from 'D:/project/cj/warehousenew/src/models/exceptionWarehouseProcessed';
export * from 'D:/project/cj/warehousenew/src/models/expenseAppreciation';
export * from 'D:/project/cj/warehousenew/src/models/firstStore';
export * from 'D:/project/cj/warehousenew/src/models/haveOutbound';
export * from 'D:/project/cj/warehousenew/src/models/inventoryBatchNo';
export * from 'D:/project/cj/warehousenew/src/models/inventoryList';
export * from 'D:/project/cj/warehousenew/src/models/inventoryResult';
export * from 'D:/project/cj/warehousenew/src/models/libararyListItem';
export * from 'D:/project/cj/warehousenew/src/models/libraryList';
export * from 'D:/project/cj/warehousenew/src/models/libraryListDetail';
export * from 'D:/project/cj/warehousenew/src/models/listDetail';
export * from 'D:/project/cj/warehousenew/src/models/materialManage';
export * from 'D:/project/cj/warehousenew/src/models/minuteMarkManage';
export * from 'D:/project/cj/warehousenew/src/models/moveInWarehouse';
export * from 'D:/project/cj/warehousenew/src/models/offsetRuleConfig';
export * from 'D:/project/cj/warehousenew/src/models/orderDispatchPending';
export * from 'D:/project/cj/warehousenew/src/models/orderDispatchProcessed';
export * from 'D:/project/cj/warehousenew/src/models/orderDispatchWaiting';
export * from 'D:/project/cj/warehousenew/src/models/outboundException';
export * from 'D:/project/cj/warehousenew/src/models/outBoundOrder';
export * from 'D:/project/cj/warehousenew/src/models/outboundRecord';
export * from 'D:/project/cj/warehousenew/src/models/overProduct';
export * from 'D:/project/cj/warehousenew/src/models/overSku';
export * from 'D:/project/cj/warehousenew/src/models/packagePrint';
export * from 'D:/project/cj/warehousenew/src/models/packageRecords';
export * from 'D:/project/cj/warehousenew/src/models/packageSigned';
export * from 'D:/project/cj/warehousenew/src/models/packageUnSign';
export * from 'D:/project/cj/warehousenew/src/models/packDetailRecords';
export * from 'D:/project/cj/warehousenew/src/models/performanceConfig';
export * from 'D:/project/cj/warehousenew/src/models/performanceList';
export * from 'D:/project/cj/warehousenew/src/models/performanceLog';
export * from 'D:/project/cj/warehousenew/src/models/positionManage';
export * from 'D:/project/cj/warehousenew/src/models/putawayManage';
export * from 'D:/project/cj/warehousenew/src/models/qualityManage';
export * from 'D:/project/cj/warehousenew/src/models/reachSoreReceiptWaiting';
export * from 'D:/project/cj/warehousenew/src/models/reachStoreReceipted';
export * from 'D:/project/cj/warehousenew/src/models/secondStore';
export * from 'D:/project/cj/warehousenew/src/models/shelfDetailRecords';
export * from 'D:/project/cj/warehousenew/src/models/signforRecords';
export * from 'D:/project/cj/warehousenew/src/models/soringManage';
export * from 'D:/project/cj/warehousenew/src/models/storeAdjust';
export * from 'D:/project/cj/warehousenew/src/models/storeRecords';
export * from 'D:/project/cj/warehousenew/src/models/storeTransfer';
export * from 'D:/project/cj/warehousenew/src/models/tallyBatch';
export * from 'D:/project/cj/warehousenew/src/models/tallyManage';
export * from 'D:/project/cj/warehousenew/src/models/thirdStore';
export * from 'D:/project/cj/warehousenew/src/models/tookOutbound';
export * from 'D:/project/cj/warehousenew/src/models/waitingOutbound';
export * from 'D:/project/cj/warehousenew/src/models/warehouseManage';
export * from 'D:/project/cj/warehousenew/src/models/warehouseWarrantDetail';
export * from 'D:/project/cj/warehousenew/src/models/warehouseWarrantFinder';
export * from 'D:/project/cj/warehousenew/src/models/wavePickingManage';
export * from 'D:/project/cj/warehousenew/src/models/weighingAbnormal';
export * from 'D:/project/cj/warehousenew/src/models/weighManage';
export * from 'D:/project/cj/warehousenew/src/models/weightConfig';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

