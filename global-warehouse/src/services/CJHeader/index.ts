import request from '@/utils/request';
import {
  GetCurrency,
  GetCountryList,
  GetWareHouseWorlds,
  GetAllMenu,
  UserMenus,
  SupplierCount,
} from './index.d';

/** 获取国家列表，货币，当前IP国家，币种符号等信息 */
export async function getInfoCollection(data: GetCurrency.Request) {
  return request.post<GetCurrency.Response>(
    '/original-service/cj/homePage/getCountryInfo',
    data,
  );
}

/** 获取国家列表 */
export async function getCountryList(data: GetCountryList.Request) {
  return request.post<GetCountryList.Response>(
    '/original-service-new/warehouseBuildWeb/management/getCountryByAreaId',
    '',
    { headers: { language: data?.language } },
  );
}

/** 获取国家列表 */
export async function getWareHouseWorlds(data: GetWareHouseWorlds.Request) {
  return request.post<GetWareHouseWorlds.Response>(
    '/original-service/cj/homePage/getWareHouseWorldsByLanguage',
    '',
    { headers: { language: data?.language } },
  );
}

/** 判断登录人操作菜单用，获取CJWEB所有菜单 */
export async function getAllMenu() {
  return request.post<GetAllMenu.Response>(
    '/original-service/app/subAccount/getAllMenu',
  );
}

/** 判断登录人操作菜单用，获取用户授权的菜单 */
export async function getUserMenus() {
  return request.post<UserMenus.Response>(
    '/original-service/app/subAccount/getUserMenus',
  );
}

/** 获取供应商评价数量 */
export async function getEvalSupplierCount() {
  return request.post<SupplierCount.Response>(
    '/cjEvaluation/getEvalSupplierCount',
  );
}

/** 退出登录 */
export async function logOut() {
  return request.post('/original-service/app/platform/quitLogin');
}
