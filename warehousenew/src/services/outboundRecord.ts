import request from '@/utils/request';
import {
  GetList,
  BatchExportExcel,
  CheckRecord,
  GetListDetail,
  GetForwardDetail,
  BatchExportBagDetail,
  BatchEditOnlineStatus,
  GetTookDetail,
  ImportInternetStatus,
} from './outboundRecord.d';
/**
 * 获取揽收列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/weighingPackage/selectCollectionRecordListPage',
    data,
  );
}

/**
 * 批量导出清单
 * @param data
 */
export function batchExportExcel(data: GetList.Request) {
  return request.post('/storehouse/weighingPackage/exportReceiveRecord', data, {
    responseType: 'blob',
  });
}

/**
 * 批量记录查看
 * @param data
 */
export function checkRecord(data: CheckRecord.Request) {
  return request.post<CheckRecord.Response>(
    '/storehouse/weighingPackage/getByReceiveId',
    data,
  );
}

/**
 * 清单详情列表
 * @param data
 */
export function getListDetail(data: GetListDetail.Request) {
  return request.post<GetListDetail.Response>(
    '/storehouse/weighingPackage/selectListDetailsPage',
    data,
  );
}

/**
 * 货代详情列表
 * @param data
 */
export function getForwardDetail(data: GetForwardDetail.Request) {
  return request.post<GetForwardDetail.Response>(
    '/storehouse/weighingPackage/selectBagDetailsPage',
    data,
  );
}

/**
 * 货代详情导出
 * @param data
 */
export function batchExportBagDetail(data: GetForwardDetail.Request) {
  return request.post('/storehouse/weighingPackage/exportBagDetails', data, {
    responseType: 'blob',
  });
}

/**
 * 货代详情-批量修改上网状态
 * @param data
 */
export function batchEditOnlineStatus(data: BatchEditOnlineStatus.Request) {
  return request.post<BatchEditOnlineStatus.Response>(
    '/storehouse/weighingPackage/batchRepairNewInternetStatus',
    data,
  );
}

/**
 * 揽件编辑--获取详情
 * @param data
 */
export function getTookDetail(data: GetTookDetail.Request) {
  return request.post<GetTookDetail.Response>(
    '/storehouse/weighingPackage/getReceiveRecord',
    data,
  );
}

/**
 * 导入修改上网状态
 * @param data
 */
export function importInternetStatus(data: ImportInternetStatus.Request) {
  return request.post<ImportInternetStatus.Response>(
    '/storehouse/weighingPackage/importAndModifyInternetStatus',
    data,
  );
}
