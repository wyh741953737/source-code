import request from '@/utils/request';
import { GetList } from './signforRecords.d';

/**
 * 获取列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse-sign-web/parcel/scanningList',
    data,
  );
}

/** 导出数据 */
export function exportData(data: GetList.RequestData) {
  return request.post(`/storehouse-sign-web/parcel/exportList`, data, {
    responseType: 'blob',
  });
}
