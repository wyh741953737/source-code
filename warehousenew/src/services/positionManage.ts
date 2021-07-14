import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import {
  GetList,
  AddRecord,
  UpdateRecord,
  MultiAddRecord,
  DeleteRecord,
  UploadRecord,
  Print,
} from './positionManage.d';

/** 查询库位列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(
    `/storehouse/storehouseInfoLocation/getStorehouseInfoLocationList`,
    data,
  );
}

/** 删除库位 */
export function deleteRecord(
  data: DeleteRecord.Request,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse/storehouseInfoLocation/deleteStorehouseInfoLocationList`,
    data,
  );
}

/** 更新库位信息 */
export function updateRecord(
  data: UpdateRecord.Request,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse/storehouseInfoLocation/updateStorehouseInfoLocation`,
    data,
  );
}

/** 新增库位 */
export function addRecord(
  data: AddRecord.Request,
): PromiseSuccessResponse<AddRecord.Response> {
  return request.post(
    `/storehouse/storehouseInfoLocation/addStorehouseInfoLocation`,
    data,
  );
}

/** 批量新增 */
export function multiAddRecord(
  data: MultiAddRecord.Request,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse/storehouseInfoLocation/addStorehouseInfoLocationList`,
    data,
  );
}

/**
 * 导入excel更新库位数据
 * @param data
 */
export function uploadRecord(data: UploadRecord.Request) {
  return request.post(
    '/storehouse/storehouseInfoLocation/updateLocationInfoByExcle',
    data,
  );
}

/**
 * 打印库区编号
 * @param data
 */
export function print(data: Print.Request) {
  return request.post(
    '/storehouse/storehouseInfoLocation/printLocationCode',
    data,
  );
}
