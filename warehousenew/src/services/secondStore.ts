import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import { GetList } from './secondStore.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(`/storehouse/inventoryUser/getInventoryUserPage`, data);
}
