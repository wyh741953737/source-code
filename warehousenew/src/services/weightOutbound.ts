import request from '@/utils/request';
import {
  GetList,
  InputWeight,
  ForceOutbound,
  BatchExportExcel,
  GetOfflineWeightList,
} from './weightOutbound.d';
/**
 * 获取列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/list',
    data,
  );
}

/**
 * 录入重量
 * @param data
 */
export function inputWeight(data: InputWeight.Request) {
  return request.post<InputWeight.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/addWeightManually',
    data,
  );
}

/**
 * 强制出库
 * @param data
 */
export function forceOutbound(data: ForceOutbound.Request) {
  return request.post<ForceOutbound.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/forcedDeliveryTrackingNumber',
    data,
  );
}

/**
 * 批量导出清单
 * @param data
 */
export function batchExportExcel(data: BatchExportExcel.Request) {
  return request.post<BatchExportExcel.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/exportOrderExcel',
    data,
    {
      responseType: 'blob',
    },
  );
}

/**
 * 获取线下称重列表
 * @param data
 */
export function getOfflineWeightList(data: GetOfflineWeightList.Request) {
  return request.post<GetOfflineWeightList.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/getLogisticsInfoByTrackingNumber',
    data,
  );
}
