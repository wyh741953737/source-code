import request from '@/utils/request';

import { GetList, PagePrint } from './surfacePlay.d';

/** 面单补打列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehousePack/getOutboundOrderList',
    data,
  );
}

/** 面单补打 */
export function pagePrint(data: PagePrint.Request) {
  return request.post<PagePrint.Response>(
    '/storehouse/storehousePack/getOrderAddress',
    data,
  );
}
