import request from '@/utils/request';
import { GetList } from './outboundException.d';
/**
 * 获取框位列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseBatchPickingAbnormal/getAbnormalList',
    data,
  );
}
