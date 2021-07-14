import request from '@/utils/request';

import {
  GetList,
  GetputawayDetail,
  GetputawayRecordDetail,
  GetErpUserInfo,
  OnShelfReassign,
} from './putawayManage.d';
/** 获取上架管理列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/onShelf/getOnShelfList`,
    data,
  );
}
/** 获取上架单详情 */
export function getputawayDetail(data: GetputawayDetail.Request) {
  return request.post<GetputawayDetail.Response>(
    `/storehouse/onShelf/getOnShelfInfoList`,
    data,
  );
}
/** 获取上架详情记录列表 */
export function getputawayRecordDetail(data: GetputawayRecordDetail.Request) {
  return request.post<GetputawayRecordDetail.Response>(
    `/storehouse/onShelf/getOnShelfInfoRecordList`,
    data,
  );
}

/** 获取erp用户信息 */
export function getErpUserInfo(data: GetErpUserInfo.Request) {
  return request.post<GetErpUserInfo.Response>(
    `/storehouse/onShelf/getErpUserInfo`,
    data,
  );
}
/** 上架重新指派 */
export function onShelfReassign(data: OnShelfReassign.Request) {
  return request.post<OnShelfReassign.Response>(
    `/storehouse/onShelf/onShelfReassign`,
    data,
  );
}
