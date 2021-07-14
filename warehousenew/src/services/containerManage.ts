import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import {
  GetList,
  Add,
  Disable,
  Release,
  Print,
  Commodity,
  Log,
  DeleteBusiness,
} from './containerManage.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(`/storehouse/container/getContainerPage`, data);
}

/** 新增容器 */
export function add(data: Add.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/addContainerInfo`, data);
}

/**
 * 容器停用
 */
export function disable(data: Disable.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/updateContainerDisable`, data);
}

/**
 * 释放容器
 */
export function release(data: Release.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/updateContainerEmpty`, data);
}

/**
 * 打印编号
 */
export function print(data: Print.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/printContainerCode`, data);
}

/** 获取容器关联商品 */
export function getCommodity(data: Commodity.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/getContainerJoinVariant`, data);
}

/** 获取容器操作日志 */
export function getLog(data: Log.Request): PromiseSuccessResponse {
  return request.post(`/storehouse/container/getContainerLog`, data);
}

/** 删除商品 */
export function deleteBusiness(
  data: DeleteBusiness.Request,
): PromiseSuccessResponse<DeleteBusiness.Response> {
  return request.post(`/storehouse/container/deleteContainerVariant`, data);
}
