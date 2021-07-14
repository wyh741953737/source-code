import request from '@/utils/request';
import {
  GetList,
  GetInfo,
  ImportInfos,
  Cancel,
  Add,
  GetPackageDetail,
  SavePackageDetail,
} from './cannibalize.d';

/**
 * 获取库内转移列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse-sign-web/storehouseTransfer/getTransferList',
    data,
  );
}

/**
 * 根据库存和sku查询商品详情
 * @param data
 */
export function getInfo(data: GetInfo.Request) {
  return request.post<GetInfo.Response>(
    '/storehouse-sign-web/storehouseTransfer/getVariantInfo',
    data,
    { noErrorMessage: true },
  );
}

/**
 * 导入调拨商品详情
 * @param data
 */
export function importInfos(data: ImportInfos.Request) {
  return request.post<ImportInfos.Response>(
    '/storehouse-sign-web/storehouseTransfer/importTransfer',
    data,
  );
}

/**
 * 取消调拨
 * @param data
 */
export function cancel(data: Cancel.Request) {
  return request.post(
    '/storehouse-sign-web/storehouseTransfer/cancelTransfer',
    data,
  );
}

/**
 * 新增调拨
 * @param data
 */
export function add(data: Add.Request) {
  return request.post<Add.Response>(
    '/storehouse-sign-web/storehouseTransfer/addTransfer',
    data,
  );
}

/**
 * 调拨单包裹详情查询
 * @param data
 */
export function getPackageDetail(data: GetPackageDetail.Request) {
  return request.post<GetPackageDetail.Response>(
    '/storehouse-sign-web/storehouseTransfer/getPackByCode',
    data,
  );
}

/**
 * 保存包裹物流信息
 * @param data
 */
export function savePackageDetail(data: SavePackageDetail.Request) {
  return request.post<SavePackageDetail.Response>(
    '/storehouse-sign-web/storehouseTransfer/updatePack',
    data,
  );
}
