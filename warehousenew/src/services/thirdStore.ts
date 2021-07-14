import request from '@/utils/request';

import { SuccessResponse } from '@/utils/serviceResponse';
import { GetList, GetDetail, CommonExport } from './thirdStore.d';

/** 获取列表 */
export function getList(
  data: GetList.Request,
): Promise<SuccessResponse<GetList.Response>> {
  return request.post(`/storehouse/inventoryInfo/getInventoryInfoPage`, data);
}

/** 查看详情 */
export function getDetail(
  data: GetDetail.Request,
): Promise<SuccessResponse<GetDetail.Response>> {
  return request.get(
    `/storehouse/storehouseInventoryInfoBatch/getBatchInventoryDetails`,
    {
      params: data,
      noRepeat: true,
    },
  );
}

/**导出 */
export function commonExport(data: CommonExport.Request) {
  return request.post(`/storehouse/inventoryInfo/getExcelInventoryInfo`, data, {
    responseType: 'blob',
  });
}
