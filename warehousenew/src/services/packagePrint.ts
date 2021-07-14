import request from '@/utils/request';
import {
  GetList,
  UpdatePackageGrossWeight,
  UpdatePackageStatus,
  AddNewPackage,
  TrackNumber,
  GetLogList,
  PrintPackageNumber,
  GetPackageInfo,
} from './packagePrint.d';
/**
 * 获取框位列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/weighingPackage/selectParcelPrintingPage',
    data,
  );
}

/**
 * 更新包裹打印的毛重
 * @param data
 */
export function updatePackageGrossWeight(
  data: UpdatePackageGrossWeight.Request,
) {
  return request.post<UpdatePackageGrossWeight.Response>(
    '/storehouse/weighingPackage/updateParcelPrinting',
    data,
  );
}

/**
 * 更新包裹打印状态
 * @param data
 */
export function addNewPackage(data: AddNewPackage.Request) {
  return request.post<AddNewPackage.Response>(
    '/storehouse/weighingPackage/addParcelTrackingNumberInfo',
    data,
  );
}

/**
 * 添加包裹
 * @param data
 */
export function trackNumber(data: TrackNumber.Request) {
  return request.post<TrackNumber.Response>(
    '/storehouse/weighingPackage/getParcelTrackingNumberInfo',
    data,
  );
}

/**
 * 验证追踪号
 * @param data
 */
export function updatePackageStatus(data: UpdatePackageStatus.Request) {
  return request.post<UpdatePackageStatus.Response>(
    '/storehouse/weighingPackage/updateParcelPrintingStatus',
    data,
  );
}

/**
 * 获取日志列表
 * @param data
 */
export function getLogList(data: GetLogList.Request) {
  return request.post<GetLogList.Response>(
    '/storehouse/outboundOrder/getOutboundOrderLog',
    data,
  );
}

/**
 * 包裹打印
 * @param data
 */
export function printPackageNumber(data: PrintPackageNumber.Request) {
  return request.post<PrintPackageNumber.Response>(
    '/storehouse/weighingPackage/parcelPrinting',
    data,
  );
}

/**
 * 包裹明细
 */
export function getPackageInfo(data: GetPackageInfo.Request) {
  return request.post<GetPackageInfo.Response>(
    '/storehouse/weighingPackage/getTrackingNumberByPackNumber',
    data,
  );
}
