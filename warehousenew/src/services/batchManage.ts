import request from '@/utils/request';
import {
  GetList,
  Update,
  GetSetting,
  GetDetailList,
  GetDetail2List,
  Print,
} from './batchManage.d';

/**
 * 获取批次列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    'storehouse/storehouseBatchPeihuobarcode/getBatchList',
    data,
  );
}

/**
 * 更新批次设置
 * @param data
 */
export function update(data: Update.Request) {
  return request.post(
    '/storehouse/storehouseBatchRules/insertRulesByStorehouseId',
    data,
  );
}

/**
 * 获取批次设置
 * @param data
 */
export function getSetting(data: GetSetting.Request) {
  return request.post<GetSetting.Response>(
    '/storehouse/storehouseBatchRules/getRulesList',
    data,
  );
}

/**
 * 获取批次详情列表
 * @param data
 */
export function getDetailList(data: GetDetailList.Request) {
  return request.post<GetDetailList.Response>(
    '/storehouse/storehouseBatchPeihuobarcode/getBatchInfoById',
    data,
  );
}

/**
 * 获取拣货详情列表
 * @param data
 */
export function getDetail2List(data: GetDetail2List.Request) {
  return request.post<GetDetail2List.Response>(
    '/storehouse/storehouseBatchPickingRecord/getRecordList',
    data,
  );
}

/**
 * 打印批次
 * @param data
 */
export function print(data: Print.Request) {
  return request.post(
    '/storehouse/storehouseBatchPeihuobarcode/getBatchPrint',
    data,
  );
}

/**
 * 打印所有未打印批次
 */
export function printRemain() {
  return request.post(
    '/storehouse/storehouseBatchPeihuobarcode/getAllBatchByNotPrint',
  );
}
