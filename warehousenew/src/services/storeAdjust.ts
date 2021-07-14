import request from '@/utils/request';
import {
  GetList,
  GiveUp,
  Adjust,
  Add,
  PrintProductCode,
} from './storeAdjust.d';

/**
 * 获取库内转移列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseInventoryAlter/getInventoryAlterPage',
    data,
  );
}

/**
 * 放弃
 * @param data
 */
export function giveUp(data: GiveUp.Request) {
  return request.post(
    '/storehouse/storehouseInventoryAlter/updateAlterStatusToAbandon',
    data,
  );
}

/**
 * 调整
 * @param data
 */
export function adjust(data: Adjust.Request) {
  return request.post(
    '/storehouse/storehouseInventoryAlter/updateAlterStatusToDone',
    data,
  );
}

/**
 * 新增调整
 * @param data
 */
export function add(data: Add.Request) {
  return request.post(
    '/storehouse/storehouseInventoryAlter/saveInventoryAlter',
    data,
  );
}

/**
 * 条码打印
 */
export function printProductCode(data: PrintProductCode.Request) {
  return request.post(
    '/storehouse/storehouseInventoryAlter/printProductCode',
    data,
  );
}
