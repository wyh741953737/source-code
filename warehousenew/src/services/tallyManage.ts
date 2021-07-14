import request from '@/utils/request';

import {
  GetList,
  GiveUp,
  BatchImportTallyDetail,
  AddTallySearch,
  AddTally,
  CreateBatchNumber,
} from './tallyManage.d';

/** 理货查询列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/storehouseTally/getTallyAndDetailPage`,
    data,
  );
}

/** 理货放弃 */
export function giveUp(data: GiveUp.Request) {
  return request.post<GiveUp.Response>(
    `/storehouse/storehouseTally/updateTallyToAbandon`,
    data,
  );
}

/** 批量导入理货单明细 */
export function batchImportTallyDetail(data: BatchImportTallyDetail.Request) {
  return request.post<BatchImportTallyDetail.Response>(
    `/storehouse/storehouseTally/insertStorehouseTally`,
    data,
  );
}

/** 新增理货单库存查询 */
export function addTallySearch(data: AddTallySearch.Request) {
  return request.post<AddTallySearch.Response>(
    `/storehouse/storehouseTally/getInventoryInfoForTally`,
    data,
  );
}

/** 新增理货单 */
export function addTally(data: AddTally.Request) {
  return request.post<AddTally.Response>(
    `/storehouse/storehouseTally/addStorehouseTally`,
    data,
  );
}

/** 生成批次 */
export function createBatchNumber(data: CreateBatchNumber.Request) {
  return request.post<CreateBatchNumber.Response>(
    `/storehouse/storehouseTallyBatch/addStorehouseTallyBatches`,
    data,
  );
}
