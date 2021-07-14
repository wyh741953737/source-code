import request from '@/utils/request';
import {
  ScanPackageOrTrackNumber,
  SaveDetailPackageShceduing,
  CheckPackageDetailById,
} from './orderDispatchDetail.d';
/**
 * 包裹或运单号扫描
 * @param data
 */
export function scanPackageOrTrackNumber(
  data: ScanPackageOrTrackNumber.Request,
) {
  return request.post<ScanPackageOrTrackNumber.Response>(
    '/storehouse-sign-web/scheduling/parcelScanning',
    data,
  );
}

// 订单调度包裹及明细保存
export function saveDetailPackageShceduing(
  data: SaveDetailPackageShceduing.Request,
) {
  return request.post<SaveDetailPackageShceduing.Response>(
    '/storehouse-sign-web/scheduling/saveSchedulingPackageAndDetail',
    data,
  );
}

// 根据调度任务ID查询包裹及明细
export function checkPackageDetailById(data: CheckPackageDetailById.Request) {
  return request.post<CheckPackageDetailById.Response>(
    '/storehouse-sign-web/scheduling/getPackageAndDetailsAccordingToSchedulingId',
    data,
  );
}
