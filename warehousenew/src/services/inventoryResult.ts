import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  GetListDetail,
  SearchExceptionData,
  Replay,
  Endplay,
  CheckEnd,
} from './inventoryResult.d';

/** 盘点结果-列表	 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(
    `/storehouse/storehouseCheckResult/getCheckResultByParam`,
    data,
  );
}

/** 盘点结果-明细	 */
export function getListDetail(
  data: GetListDetail.Request,
): Promise<SuccessResponse<GetListDetail.Response>> {
  return request.post(
    `/storehouse/storehouseCheckResult/getCheckResultDetailByParam`,
    data,
  );
}

/** 盘点结果-查询盘点单异常数据 */
export function searchExceptionData(
  data: SearchExceptionData.Request,
): Promise<SuccessResponse<SearchExceptionData.Response>> {
  return request.post(
    `/storehouse/storehouseCheckResult/getExQuantityCheckResultByCheckNum`,
    data,
  );
}

/** 盘点结果-复盘 */
export function replay(
  data: Replay.Request,
): Promise<SuccessResponse<Replay.Response>> {
  return request.post(
    `/storehouse/storehouseCheckResult/updateSecondCheck`,
    data,
  );
}

/** 盘点结果-终盘 */
export function endplay(
  data: Endplay.Request,
): Promise<SuccessResponse<Endplay.Response>> {
  return request.post(
    `/storehouse/storehouseCheckResult/updateLastCheck`,
    data,
  );
}

/** 盘点结果-结束 */
export function checkEnd(
  data: CheckEnd.Request,
): Promise<SuccessResponse<CheckEnd.Response>> {
  return request.post(`/storehouse/storehouseCheckResult/checkEnd`, data);
}
