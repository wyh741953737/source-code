import request from '@/utils/request';
import { GetList } from './shelfDetailRecords.d';

/**
 * 获取列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseInboundRecord/getRecordList',
    data,
  );
}
