import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import { GetList, Finded, Lost } from '@/services/exceptionRecords.d';

/** 获取异常记录列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(
    `/storehouse-sign-web/inventoryRecord/getSmallPackageList`,
    data,
  );
}

/** 货已找到 */
export function finded(data: Finded.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inventoryRecord/updateGoodsFound`,
    data,
  );
}

/** 确认少件数量 */
export function lost(data: Lost.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inventoryRecord/updateLessPackage`,
    data,
  );
}
