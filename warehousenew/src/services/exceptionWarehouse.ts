import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  Add,
  Update,
  Submit,
  GiveUp,
  Confirm,
} from './exceptionWarehouse.d';

/** 获取异常记录列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(
    `/storehouse-sign-web/inbound/selectReceiptExceptionPage`,
    data,
  );
}

/** 新增异常记录 */
export function add(data: Array<Add.Request>): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inbound/addStorageExceptionRecord`,
    data,
  );
}

/** 修改异常记录 */
export function update(data: Update.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inbound/updateStorageExceptionRecord`,
    data,
  );
}

/**
 * 入库异常提交
 * @param data
 */
export function subimt(data: Submit.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addPurchaseExceptionRecord`,
    data,
  );
}

/**
 * 放弃异常
 * @param data
 */
export function giveUp(data: GiveUp.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inbound/giveUpReceiptException`,
    data,
  );
}

/**
 * 确认处理
 * @param data
 */
export function confirm(data: Confirm.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inbound/confirmProcessingReceiptException`,
    data,
  );
}
