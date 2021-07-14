import request from '@/utils/request';
import {
  PromiseSuccessResponse,
  SuccessResponse,
} from '@/utils/serviceResponse';
import {
  GetWarehouse,
  CategoryApply,
  GetAreaById,
  GetLog,
  ScanContainer,
  SearchCustomer,
  SearchLogistics,
} from './common.d';

/** 登入接口 */
export const login = (data: any) => {
  return request.post(`/app/employee/login`, data);
};
/** 获取个性化信息 */
export const getPodInfo = (data: any) => {
  return request.get('', { params: data });
};

/**
 * 获取仓库列表
 */
export function getWarehouse(data?: GetWarehouse.Request) {
  return request.post<Array<GetWarehouse.Response>>(
    '/storehouse/storehouseInfo/getStorehouseInfo',
    data,
  );
}

/**
 * 获取库区品类
 */
export function getCategory() {
  return request.post<Array<CategoryApply.Response>>(
    '/storehouse/product/getProductCategory',
  );
}

/**
 * 获取根据仓库库区
 */
export function getAreaById(
  data: GetAreaById.Request,
): PromiseSuccessResponse<GetAreaById.Response> {
  return request.post(
    '/storehouse/storehouseInfoArea/getAreaNameByStorehouseId',
    data,
  );
}

/**获取日志  */
export function getLog(
  data: GetLog.Request,
): Promise<SuccessResponse<GetLog.Response>> {
  return request.post(`/storehouse-sign-web/storehouseLog/list`, data);
}

/**扫描容器  */
export function scanContainer(
  data: ScanContainer.Request,
): Promise<SuccessResponse<ScanContainer.Response>> {
  return request.post(`/storehouse/container/scanContainer`, data);
}

/**
 * 搜索客户名称
 * @param data
 */
export function searchCustomer(data: SearchCustomer.Request) {
  return request.post<SearchCustomer.Response>(
    '/storehouse/storehouseWavePickingRule/getClientInfo',
    data,
  );
}

/**
 * 搜索物流渠道
 * @param data
 */
export function searchLogistics(data: SearchLogistics.Request) {
  return request.post<SearchLogistics.Response>(
    '/storehouse/storehouseWavePickingRule/getLogisticsInfo',
    data,
  );
}
