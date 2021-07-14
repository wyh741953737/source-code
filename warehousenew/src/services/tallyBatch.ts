import request from '@/utils/request';

import { GetList, GetDetail, Print } from './tallyBatch.d';

/** 查询列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/storehouseTallyBatch/getTallyBatchList`,
    data,
  );
}
/** 查询明细 */
export function getDetail(data: GetDetail.Request) {
  return request.post<GetDetail.Response>(
    `/storehouse/storehouseTallyBatch/getTallyBatchVariantList`,
    data,
  );
}

/**
 * 打印批次
 * @param data
 */
export function print(data: Print.Request) {
  return request.post('/storehouse/storehouseTallyBatch/tallyBatchPrint', data);
}
