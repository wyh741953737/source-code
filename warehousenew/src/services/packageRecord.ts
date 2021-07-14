import request from '@/utils/request';
import { GetList, ExportList, PrintList } from '@/services/packageRecord.d';

/** 获取异常记录列表 */
export function getList(data: GetList.Request) {
  return request.post(`/storehouse/storehousePack/getStorehousePackPage`, data);
}

/** 导出  */
export function exportList(data: ExportList.Request) {
  return request.post(
    `/storehouse/storehousePack/outputBatchStorehousePacks`,
    data,
    {
      responseType: 'blob',
    },
  );
}

/**
 * 批量打印面单
 * @param data
 */
export function printList(data: PrintList.Request) {
  return request.post<PrintList.Response>(
    '/storehouse/storehousePack/getOrderAddressList',
    data,
  );
}

/**
 * 批量打印面单-2,由于物流未对接，新增接口临时启用
 * @param data
 */
export function printListTwo(data: PrintList.Request) {
  return request.post<PrintList.Response>(
    '/storehouse/storehousePack/getNewSheetUrl',
    data,
  );
}
