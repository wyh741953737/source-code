import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import { GetList, PrintBatch } from './inventoryBatchNo.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(
    `/storehouse/storehouseCheckBatch/getCheckBatchPage`,
    data,
  );
}
/** 获取列表 */
export function printBatch(
  data: PrintBatch.Request,
): Promise<SuccessResponse<PrintBatch.Response>> {
  return request.post(`/storehouse/storehouseCheckBatch/printCheckBatch`, data);
}
