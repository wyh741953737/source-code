import request from '@/utils/request';

import { GetPackageInfo, DeletePackage, PrintTook } from './tookOutbound.d';

/** 包裹扫描 */
export function getPackageInfo(data: GetPackageInfo.Request) {
  return request.post<GetPackageInfo.Response>(
    '/storehouse/weighingPackage/getOutboundWeighingPackage',
    data,
  );
}

/**包裹删除 */
export function dletePackage(data: DeletePackage.Request) {
  return request.post<DeletePackage.Response>(
    '/storehouse/weighingPackage/addOutboundReceiveRecordDeleteFlag',
    data,
  );
}

/**揽收打印 */
export function printTook(data: PrintTook.Request) {
  return request.post<PrintTook.Response>(
    '/storehouse/weighingPackage/printCollectionRecord',
    data,
  );
}
