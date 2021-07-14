import request from '@/utils/request';
import {
  GetList,
  GetTurnoverDetailPage,
  AddStorehouseTally,
} from '@/services/inventoryTurnOver.d';

/** 获取sku列表 */
export function getskuList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/storehouseInventoryTurnover/getInventoryTurnoverPage`,
    data,
  );
}

/** 获取商品列表 */
export function getProductList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/storehouseInventoryTurnoverProduct/getInventoryTurnoverProductPage`,
    data,
  );
}

/** 理货详情获取 */
export function getTurnoverDetailPage(data: GetTurnoverDetailPage.Request) {
  return request.post<GetTurnoverDetailPage.Response>(
    `/storehouse/storehouseTurnoverDetail/getTurnoverDetailPage`,
    data,
  );
}

/** 生成理货单 */
export function addStorehouseTally(data: AddStorehouseTally.Request) {
  return request.post(
    `/storehouse/storehouseTurnover/addStorehouseTally`,
    data,
  );
}
