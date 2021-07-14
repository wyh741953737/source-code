import request from '@/utils/request';
import { GetList } from './packDetailRecords.d';

/**
 * 获取列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehousePack/getStorehousePackListPage',
    data,
  );
}
