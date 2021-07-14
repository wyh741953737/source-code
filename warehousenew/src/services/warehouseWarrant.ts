import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  DeleteRecord,
  AddRecord,
  UpdateRecord,
  GetDetail,
  GetDetailInfo,
  GetLogs,
  ManuallyImport,
} from './warehouseWarrant.d';

/** 查询入库单 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(
    `/storehouse-sign-web/storehouseReceipt/selectPage`,
    data,
  );
}

/** 删除入库单 */
export function deleteRecord(
  data: DeleteRecord.Request,
): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/storehouseReceipt/delete`, data);
}

/** 更新入库单 */
export function updateRecord(
  data: UpdateRecord.Request,
): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/storehouseReceipt/update`, data);
}

/** 新增入库单 */
export function addRecord(data: AddRecord.Request): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/storehouseReceipt/save`, data);
}

/** 手工创建入库单 */
export function manuallyImport(data: ManuallyImport.Request) {
  return request.post<ManuallyImport.Response>(
    `/storehouse-sign-web/storehouseReceipt/manuallyImportAndCreateWarehouseReceipt`,
    data,
  );
}

/** 获取库单详情详细列表 */
export function getDetail(
  data: GetDetail.Request,
): PromiseSuccessResponse<GetDetail.Response> {
  return request.post(
    `/storehouse-sign-web/storehouseReceiptDetails/selectPage`,
    data,
  );
}

/** 获取入库单详情 */
export function getDetailInfo(
  data: GetDetailInfo.Request,
): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/storehouseReceipt/detail`, data);
}
