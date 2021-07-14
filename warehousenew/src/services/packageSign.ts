import request from '@/utils/request';

import {
  GetParcelList,
  GetReceiptList,
  PrintOrder,
  ServiceProductConfirm,
  GetNewLogisticInfo,
} from './packageSign.d';

/** 已签收待签收列表 */
export function getParcelList(data: GetParcelList.Request) {
  return request.post<GetParcelList.Response>(
    `/storehouse-sign-web/parcel/list`,
    data,
  );
}

/** 包裹签收操作 */
export function getReceiptList(data: GetReceiptList.Request) {
  return request.post<GetReceiptList.Response>(
    `/storehouse-sign-web/parcel/signForReceipt`,
    data,
  );
}

/**打印运单号  */
export function printOrder(data: PrintOrder.Request) {
  return request.get<PrintOrder.Response>(
    `/storehouse/cjProductSub/printPurchaseOrder`,
    {
      params: data,
    },
  );
}

/** 服务商品包裹签收操作 */
export function serviceProductConfirm(data: ServiceProductConfirm.Request) {
  return request.post<ServiceProductConfirm.Response>(
    `/storehouse-sign-web/parcel/serviceGoodsSignFor`,
    data,
  );
}

/** 获取最新物流信息 */
export function getNewLogisticInfo(data: GetNewLogisticInfo.Request) {
  return request.post<GetNewLogisticInfo.Response>(
    `/storehouse-sign-web/synWarehouse/manualSyn1688TrackingNumber`,
    data,
  );
}
