import request from '@/utils/request';
import { GetList } from './storeRecords.d';
import { SuccessResponse } from '@/utils/serviceResponse';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Respone>> {
  return request.post(
    `/storehouse/inventoryRecord/getInventoryRecordPage`,
    data,
  );
}
