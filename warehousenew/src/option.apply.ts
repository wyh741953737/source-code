import { Apply } from '@/hooks/useOptions';
import * as api from '@/services/common';
import { searchWavePicking } from '@/services/wavePickingManage';
import { SearchWavePicking } from '@/services/wavePickingManage.d';

/**
 * 仓库的apply
 * @param params
 */
export const warehouseApply: Apply = async params => {
  const resp = await api.getWarehouse({ useStorageType: 1 });
  return resp.data.map(item => ({ key: item.id, value: item.storageName }));
};
/**
 * 商品目录
 * @param params
 */
export const categoryApply: Apply = async params => {
  const resp = await api.getCategory();
  return resp.data.map(item => ({ key: item.id, value: item.name }));
};
/**
 * 获取库区
 * @param params
 */
export const areaApply: Apply = async params => {
  if (!params) return [];
  const resp = await api.getAreaById({ storehouseId: params });
  return resp.data.map(item => ({ key: item.id, value: item.areaName }));
};
/**
 * 根据波次名称搜索波次参数
 * @param params
 */
export const searchWavePickingApply: Apply = async (
  params?: SearchWavePicking.Request,
) => {
  if (!params || !params.waveName) return [];
  const resp = await searchWavePicking({
    storehouseId: params.storehouseId,
    waveName: params.waveName,
  });
  return resp.data.map(item => ({
    key: item.id,
    value: item.waveName,
    data: item,
  }));
};
/**
 * 根据用客户名称模糊搜索
 * @param params
 */
export const searchCustomerApply: Apply = async (params: { name?: string }) => {
  if (!params.name) return [];
  const resp = await api.searchCustomer({ name: params.name });
  return resp.data.map(item => ({ key: item.oldId, value: item.name }));
};
/**
 * 根据物流名称模糊搜索
 * @param params
 */
export const searchLogisticsApply: Apply = async (params: {
  name?: string;
}) => {
  if (!params.name) return [];
  const resp = await api.searchLogistics({ name: params.name });
  return resp.data.map(item => ({ key: item.id, value: item.cnName }));
};
