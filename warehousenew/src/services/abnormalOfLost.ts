import request from '@/utils/request';
import { GetList, Finded, Lost, ExportData } from '@/services/abnormalOfLost.d';

/** 获取异常记录列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/storehouseStockEx/getStockoutExList`,
    data,
  );
}

/** 货已找到 */
export function finded(data: Finded.Request) {
  return request.post(
    `/storehouse/storehouseStockEx/updateAlreadyFindById`,
    data,
  );
}

/** 确认少件数量 */
export function lost(data: Lost.Request) {
  return request.post(`/storehouse/storehouseStockEx/updateStockById`, data);
}

/** 导出数据 */
export function exportData(data: ExportData.Request) {
  return request.post(
    `/storehouse/storehouseStockEx/getExcelStockoutExList`,
    data,
    {
      responseType: 'blob',
    },
  );
}
