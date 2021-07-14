import request from '@/utils/request';
import {
  GetList,
  GetLogisticList,
  GetLogisticNumberList,
  UpdateConfigList,
  DeleteRecord,
  SearchThresholdVal,
  SaveThresholdVal,
} from './weightConfig.d';
/**
 * 获取框位列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseFrameSetting/list',
    data,
  );
}

/**
 * 获取物流列表
 * @param data
 */
export function getLogisticList() {
  return request.post<GetLogisticList.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/getCompanyList',
  );
}

/**
 * 获取物流账号列表
 * @param data
 */
export function getLogisticNumberList(data: GetLogisticNumberList.Request) {
  return request.post<GetLogisticNumberList.Response>(
    '/storehouse/storehouseOutboundOrderLogisticsInfo/getAccountById',
    data,
  );
}

/**
 * 修改新增框位
 * @param data
 */
export function updateConfigList(data: UpdateConfigList.Request) {
  return request.post<UpdateConfigList.Response>(
    '/storehouse/storehouseFrameSetting/saveSetting',
    data,
  );
}

/**
 * 删除框位
 * @param data
 */
export function deleteRecord(data: DeleteRecord.Request) {
  return request.post<DeleteRecord.Response>(
    '/storehouse/storehouseFrameSetting/remove',
    data,
  );
}

/**
 * 保存重量阈值
 * @param data
 */
export function saveThresholdVal(data: SaveThresholdVal.Request) {
  return request.post<SaveThresholdVal.Response>(
    '/storehouse/storehouseFrameSetting/saveWeightThreshold',
    data,
  );
}

/**
 * 查询重量阈值
 * @param data
 */
export function searchThresholdVal() {
  return request.post<SearchThresholdVal.Response>(
    '/storehouse/storehouseFrameSetting/getWeightThreshold',
  );
}
