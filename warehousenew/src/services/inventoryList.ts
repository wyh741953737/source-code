import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  GetDetail,
  DeleteDetail,
  GiveUp,
  GetCustomerBySKU,
  GetCheckNum,
  CreateBatch,
} from './inventoryList.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(`/storehouse/storehouseCheck/getCheckByParam`, data);
}

/** 获取盘点明细 */
export function getRowDetail(
  data: GetDetail.Request,
): Promise<SuccessResponse<GetDetail.Response>> {
  return request.post(`/storehouse/storehouseCheck/getCheckVariant`, data, {
    // noRepeat: true,
  });
}

/**删除盘点明细 */
export function deleteDetail(
  data: DeleteDetail.Request,
): Promise<SuccessResponse<DeleteDetail.Response>> {
  return request.post(`/storehouse/storehouseCheck/deleteCheckVariant`, data);
}

/** 放弃 */
export function giveUp(
  data: GiveUp.Request,
): Promise<SuccessResponse<GiveUp.Response>> {
  return request.post(`/storehouse/storehouseCheck/deleteCheck`, data);
}

/**通过SKU获取货主 */
export function getCustomerBySKU(
  data: GetCustomerBySKU.Request,
): Promise<SuccessResponse<GetCustomerBySKU.Response>> {
  return request.post(`/storehouse/storehouseCheck/getCustomerIdBysku`, data, {
    noRepeat: true, // 取消旧的请求，保留最新的请求
  });
}

/**获取盘点单号 */
export function getCheckNum(
  data?: any,
): Promise<SuccessResponse<GetCheckNum.Response>> {
  return request.post(`/storehouse/storehouseCheck/getCheckNum`, data, {
    noRepeat: true, // 取消旧的请求，保留最新的请求
  });
}

/** 增加 */
export function add(data: any): Promise<SuccessResponse<GetList.Response>> {
  return request.post(`/storehouse/storehouseCheck/addCheck`, data);
}

/** 增加 */
export function createBatch(
  data: CreateBatch.Request,
): Promise<SuccessResponse<CreateBatch.Response>> {
  return request.post(`/storehouse/storehouseCheck/addBtach`, data);
}
