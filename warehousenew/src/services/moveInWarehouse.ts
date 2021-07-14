import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';
import {
  GetList,
  Submit,
  GiveUp,
  GetInventorys,
  VerifySKUOrNum,
  VerifyTargetLocation,
  Add,
  GetRecommendedLocation,
} from './moveInWarehouse.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(`/storehouse/inventoryMove/getInventoryMoveList`, data);
}

/**
 * 提交移动
 * @param data
 */
export function submit(data: Submit.Request): PromiseSuccessResponse {
  return request.post('/storehouse/inventoryMove/submitMove', data, {
    noErrorMessage: true,
  });
}

/**
 * 放弃移动
 * @param data
 */
export function giveUp(data: GiveUp.Request): PromiseSuccessResponse {
  return request.post('/storehouse/inventoryMove/submitAbandon', data);
}

/**
 * 查询需要移动的商品库存
 * @param data
 * @param type 启用那种接口
 */
export function getInventorys(
  data: GetInventorys.Request,
  type: 1 | 2 | 3,
): PromiseSuccessResponse {
  let url = ``;
  switch (type) {
    case 1:
      url = '/storehouse/inventoryMove/getInventorys';
      break;
    case 2:
      url = '/storehouse/storehouseInventoryTransfer/getInventoryBatchs';
      break;
    case 3:
      url = '/storehouse/storehouseInventoryAlter/getInventoryForAlter';
      break;
  }
  return request.post(url, data);
}

/**
 * 校验sku、短码
 * @param data
 */
export function verifySKUOrNum(
  data: VerifySKUOrNum.Request,
): PromiseSuccessResponse<VerifySKUOrNum.Response> {
  return request.post('/storehouse/inventoryMove/verifyskuOrNum', data, {
    noErrorMessage: true,
  });
}

/**
 * 校验目标容器、库位
 * @param data
 */
export function verifyTargetLocation(
  data: VerifyTargetLocation.Request,
): PromiseSuccessResponse<VerifyTargetLocation.Response> {
  return request.post('/storehouse/inventoryMove/verifyTargetLocation', data, {
    noErrorMessage: true,
  });
}

/**
 * 新增库内移动
 * @param data
 * @constructor
 */
export function add(data: Add.Request): PromiseSuccessResponse {
  return request.post('/storehouse/inventoryMove/addInventoryMove', data);
}

/**推荐库位信息 */

export function getRecommendedLocation(
  data: GetRecommendedLocation.Request,
): PromiseSuccessResponse<GetRecommendedLocation.Response> {
  return request.post(
    '/storehouse/inventoryMove/getRecommendedLocation',
    data,
    {
      noErrorMessage: true,
    },
  );
}
