import request from '@/utils/request';

import {
  GetList,
  GetInspectDetails,
  QualityMakeup,
  QualityConfirm,
  PrintOrder,
  AddException,
  MakeUpByReceiptInspect,
  PrintBatchNumber,
  GetSkipOrderBatchPrintByBatchNum,
} from './qualityManage.d';

/** 获取质检管理列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/inspect/getInspectPage`,
    data,
  );
}

export function getDetail(data: GetInspectDetails.Request) {
  return request.post<GetInspectDetails.Response>(
    `/storehouse/inspect/getInspectDetails`,
    data,
  );
}

/**质检补打  */
export function qualityMakeup(data: QualityMakeup.Request) {
  return request.post<QualityMakeup.Response>(
    `/storehouse/inspect/makeUp`,
    data,
  );
}

/**质检确认  */
export function qualityConfirm(data: QualityConfirm.Request) {
  return request.post<QualityConfirm.Response>(
    `/storehouse/inspect/updateInspectConfirm`,
    data,
  );
}

/**质检打印采购单  */
export function printOrder(data: PrintOrder.Request) {
  return request.get<PrintOrder.Response>(
    `/storehouse/cjProductSub/printPurchaseOrder`,
    {
      params: data,
    },
  );
}

/**质检异常新增  */
export function addException(data: AddException.Request) {
  return request.post<AddException.Response>(
    `/storehouse/inspect/addException`,
    data,
  );
}

/**质检次品多货打印  */
export function makeUpByReceiptInspect(data: MakeUpByReceiptInspect.Request) {
  return request.post<MakeUpByReceiptInspect.Response>(
    `/storehouse/inspect/makeUpByReceiptInspect`,
    data,
  );
}

/**打印批次号  */
export function printBatchNumber(data: PrintBatchNumber.Request) {
  return request.post<PrintBatchNumber.Response>(
    `/storehouse/weigh/printBatchNumber`,
    data,
  );
}

/**越库批次号打印  */
export function getSkipOrderBatchPrintByBatchNum(
  data: GetSkipOrderBatchPrintByBatchNum.Request,
) {
  return request.post<GetSkipOrderBatchPrintByBatchNum.Response>(
    `/storehouse//storehouseSkipOrder/getSkipOrderBatchPrintByBatchNum`,
    data,
  );
}
