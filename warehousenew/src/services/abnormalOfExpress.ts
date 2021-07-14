import request from '@/utils/request';
import {
  GetList,
  Feed,
  Print,
  ReCreate,
  FilloutTrackNumber,
} from '@/services/abnormalOfExpress.d';

/** 获取异常记录列表 */
export function getList(data: GetList.Request) {
  return request.post(`/storehouse/storehousePack/getSheetExList`, data);
}

/** 重新生成面单 */
export function reCreate(data: ReCreate.Request) {
  return request.post(``, data);
}
/**
 * 手动回填运单号
 * @param data
 */
export function filloutTrackNumber(data: FilloutTrackNumber.Request) {
  return request.post<FilloutTrackNumber.Response>(
    '/storehouse/storehousePack/addSheetByPackCode',
    data,
  );
}
