import request from '@/utils/request';
import { GetList, GiveUp, Transfer, Abnormal, Add } from './storeTransfer.d';

/**
 * 获取库内转移列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseInventoryTransfer/getInventoryTransferPage',
    data,
  );
}

/**
 * 放弃
 * @param data
 */
export function giveUp(data: GiveUp.Request) {
  return request.post(
    '/storehouse/storehouseInventoryTransfer/updateStatusToAbandon',
    data,
  );
}

/**
 * 转移
 * @param data
 */
export function transfer(data: Transfer.Request) {
  return request.post(
    '/storehouse/storehouseInventoryTransfer/updateStatusToFinished',
    data,
  );
}

/**
 * 入库异常
 * @param data
 */
export function abnormal(data: Abnormal.Request) {
  return request.post(
    '/storehouse/storehouseInventoryTransfer/updateTransferToException',
    data,
  );
}

/**
 * 新增转移
 * @param data
 */
export function add(data: Add.Request) {
  return request.post(
    '/storehouse/storehouseInventoryTransfer/addTransfer',
    data,
  );
}
