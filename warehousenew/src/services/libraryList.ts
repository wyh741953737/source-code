import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  GetCrossDetailList,
  GetDetailList,
  CrossSetting,
  BatchPrints,
  Release,
} from './libraryList.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(`/storehouse/storehouseSkip/getStorehouseSkipPage`, data);
}

/** 获取批次详情列表 */
export function getDetailList(
  data: GetDetailList.Request,
): Promise<SuccessResponse<GetDetailList.Response>> {
  return request.post(
    `/storehouse/storehouseSkipOrder/getStorehouseSkipOrderPage`,
    data,
  );
}

/** 获取越库订单列表 */
export function getCrossOrderDetailList(
  data: GetCrossDetailList.Request,
): Promise<SuccessResponse<GetCrossDetailList.Response>> {
  return request.post(
    `/storehouse/storehouseSkipOrder/getStorehouseSkipOrderDetailPage`,
    data,
  );
}

/**
 * 越库设置
 * @param data
 */
export function crossDatabaseSetting(data: CrossSetting.Request) {
  return request.post<CrossSetting.Response>(
    '/storehouse/deductionRules/updateCrossDockingRule',
    data,
  );
}

/**
 * 批量打印
 * @param data
 */
export function batchPrintRequest(data: BatchPrints.Request) {
  return request.post<any>(
    '/storehouse/storehouseSkipOrder/getSkipOrderBatchPrint',
    data,
  );
}

/**
 * 打印所有未打印的
 * @param data
 */
export function batchPrintAllRequest(data: {}) {
  return request.post<any>(
    '/storehouse/storehouseSkipOrder/getSkipOrderAllBatchByNotPrint',
    data,
  );
}

/** 越库规则状态查询 */

export function getCrossStatus(data: CrossSetting.Request) {
  return request.post<CrossSetting.Response>(
    '/storehouse/deductionRules/getCrossDockingRuleStatus',
    data,
  );
}

/** 越库批次释放 */
export function skipOrderReleaseInventory(data: Release.Request) {
  return request.post<Release.Response>(
    '/storehouse/storehouseSkipOrder/skipOrderReleaseInventory',
    data,
  );
}
