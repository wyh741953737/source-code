import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import { GetList, AddRecord, UpdateRecord } from './warehouseManage.d';

/** 查询库区列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(
    `/storehouse/storehouseInfoArea/getStorehouseInfoAreaList`,
    data,
  );
}

/** 更新库区信息 */
export function updateRecord(
  data: UpdateRecord.Request,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse/storehouseInfoArea/updateStorehouseInfoArea`,
    data,
  );
}

/** 新增库区 */
export function addRecord(data: AddRecord.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse/storehouseInfoArea/addStorehouseInfoArea`,
    data,
  );
}
