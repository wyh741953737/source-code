import request from '@/utils/request';

import {
  GetList,
  AddConsumables,
  EditConsumables,
  GetLog,
  BatchImport,
  ExportExcel,
} from './materialManage.d';

/** 查询列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/consumables/getConsumables`,
    data,
  );
}

/** 新增耗材 */
export function addConsumables(data: AddConsumables.Request) {
  return request.post<AddConsumables.Response>(
    `/storehouse/consumables/addConsumables`,
    data,
  );
}

/**修改耗材 */
export function editConsumables(data: EditConsumables.Request) {
  return request.post<EditConsumables.Response>(
    `/storehouse/consumables/updateConsumables`,
    data,
  );
}

/**日志查询 */
export function getLog(data: GetLog.Request) {
  return request.post<GetLog.Response>(
    `/storehouse/consumablesLog/getConsumablesLog`,
    data,
  );
}

/**批量导入 */
export function batchImport(data: BatchImport.Request) {
  return request.post<BatchImport.Response>(
    `/storehouse/consumables/addBatchConsumables`,
    data,
  );
}

/**批量导出 */
export function exportExcel(data: ExportExcel.Request) {
  return request.post<ExportExcel.Response>(
    `/storehouse/consumables/outputBatchConsumables`,
    data,
    {
      responseType: 'blob',
    },
  );
}
