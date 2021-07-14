import request from '@/utils/request';
import { GetList, GetDetail } from './soringManage.d';

/**
 * 获取批次列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    // '/storehouse/storehouseBatchSortedRecord/getBatchSortedRecordPage',
    '/storehouse/storehouseBatchSortedRecord/getStorehouseBatchIdPage',
    data,
  );
}

/**
 * 获取批次详情
 * @param data
 */
export function getDetailList(data: GetDetail.Request) {
  return request.post<GetDetail.Response>(
    '/storehouse/storehouseBatchSortedRecord/getStorehouseBatchOrder',
    data,
  );
}
