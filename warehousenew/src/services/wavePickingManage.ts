import request from '@/utils/request';
import {
  GetList,
  Repeal,
  Add,
  SearchWavePicking,
  GetWavePickingDetailList,
} from './wavePickingManage.d';

export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/storehouseWavePicking/getWavePickingList',
    data,
  );
}

/**
 * 撤销波次
 * @param data
 */
export function repeal(data: Repeal.Request) {
  return request.post(
    '/storehouse/storehouseWavePicking/revokeWavePicking',
    data,
  );
}

export function add(data: Add.Request) {
  return request.post(
    '/storehouse/storehouseWavePickingRule/addWaveRule',
    data,
  );
}

/**
 * 搜索波次名称获取参数
 * @param data
 */
export function searchWavePicking(data: SearchWavePicking.Request) {
  return request.post<SearchWavePicking.Response>(
    '/storehouse/storehouseWavePickingRule/getWaveRuleByName',
    data,
  );
}

/**
 * 获取波次详情列表
 * @param data
 */
export function getWavePickingDetailList(
  data: GetWavePickingDetailList.Request,
) {
  return request.post<GetWavePickingDetailList.Response>(
    '/storehouse/storehouseWavePicking/getWavePickingOutboundList',
    data,
  );
}
