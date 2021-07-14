import request from '@/utils/request';
import { SuccessResponse } from '@/utils/serviceResponse';

import {
  GetOrderList,
  ExceptionProcess,
  GetLog,
  GetDetail,
  GetBasicInfo,
  GetLogisticsInfo,
  GetStatusCount,
  DeductionInventory,
  ReleaseInventory,
  DirectExport,
  SubmitToWeight,
} from './outBoundOrder.d';

/** 出库单查询列表 */
export function getOrderList(data: GetOrderList.Request) {
  return request.post<GetOrderList.Response>(
    `/storehouse-sign-web/outboundOrder/selectOutboundOrderPage`,
    data,
  );
}

/** 超时出库-异常订单处理 */
export function exceptionProcess(data: ExceptionProcess.Request) {
  return request.post<ExceptionProcess.Response>(
    `/storehouse/outboundOrder/exceptionOrderProcessing`,
    data,
  );
}

/**出库单查询日志 */
export function getLog(data: GetLog.Request) {
  return request.post<GetLog.Response>(
    `/storehouse/outboundOrder/getOutboundOrderLog`,
    data,
  );
}

/**出库单查询-详情 */
export function getDetail(data: GetDetail.Request) {
  return request.post<GetDetail.Response>(
    `/storehouse/outboundOrder/selectOutboundOrderDetailPage`,
    data,
  );
}

/**出库单详情-物流信息 */
export function getBasicInfo(data: GetBasicInfo.Request) {
  return request.post<GetBasicInfo.Response>(
    `/storehouse/outboundOrder/getOutboundOrderById`,
    data,
  );
}

/**出库单详情-物流信息 */
export function getLogisticsInfo(data: GetLogisticsInfo.Request) {
  return request.post<GetLogisticsInfo.Response>(
    `/storehouse/outboundOrder/getOrderById`,
    data,
  );
}

/**出库单详情-获取各个状态数量 */
export function getStatusCount(data: GetStatusCount.Request) {
  return request.post<GetStatusCount.Response>(
    `/storehouse/outboundOrder/getOutboundOrderStatusCount`,
    data,
  );
}

/**
 * 抵扣库存
 * @param data
 */
export function deductionInventory(data: DeductionInventory.Request) {
  return request.post<DeductionInventory.Response>(
    '/storehouse/inventoryInfo/deductionInventoryByOrder',
    data,
  );
}

/**
 * 释放库存
 * @param data
 */
export function releaseInventory(data: ReleaseInventory.Request) {
  return request.post<ReleaseInventory.Response>(
    '/storehouse/inventoryInfo/inventoryReleaseByOrderId',
    data,
  );
}

/**直发单导出 */
export function directExport(data: DirectExport.Request) {
  return request.post(`/storehouse-sign-web/outboundOrder/exportOrder`, data, {
    responseType: 'blob',
  });
}

/**导出 */
export function commonExport(data: DirectExport.Request) {
  return request.post(
    `/storehouse-sign-web/outboundOrder/exportOrderList`,
    data,
    {
      responseType: 'blob',
    },
  );
}

/**待配齐提交到待称重 */
export function submitToWeight(data: SubmitToWeight.Request) {
  return request.post<SubmitToWeight.Response>(
    `/storehouse/outboundOrder/submitWeighed`,
    data,
  );
}
