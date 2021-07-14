import request from '@/utils/request';

import {
  GetDetail,
  GetSubPage,
  MinuteMarkConfirm,
  PrintOrder,
  PrintSku,
  AddException,
  SupplementPrint,
  MinuteMarkNewConfirm,
  ConfirmSingleSub,
  RecallSub,
  PodOrderList,
  SubmitPodOrder,
  PrintRequest,
} from './minuteMarkManage.d';

/** 分标查询详情 */
export function getDetail(data: GetDetail.Request) {
  return request.post<GetDetail.Response>(
    `/storehouse/cjProductSub/getSubList`,
    data,
  );
}
/** 分标查询 */
export function getSubPage(data: GetSubPage.Request) {
  return request.post<GetSubPage.Response>(
    `/storehouse/cjProductSub/getSubPage`,
    data,
  );
}
/** 分标确认 */

export function minuteMarkConfirm(data: MinuteMarkConfirm.Request) {
  return request.post<MinuteMarkConfirm.Response>(
    `/storehouse/cjProductSub/confirmSub`,
    data,
  );
}

/**打印采购单  */
export function printOrder(data: PrintOrder.Request) {
  return request.get<PrintOrder.Response>(
    `/storehouse/cjProductSub/printPurchaseOrder`,
    {
      params: data,
    },
  );
}

/**打印sku  */
export function printSku(data: PrintSku.Request) {
  return request.post<PrintSku.Response>(
    `/storehouse/cjProductSub/printBarcode`,
    data,
  );
}

/**分标异常新增  */
export function addException(data: AddException.Request) {
  return request.post<AddException.Response>(
    `/storehouse/cjProductSub/addExceptionMessage`,
    data,
  );
}

/**补打sku  */
export function supplementPrint(data: SupplementPrint.Request) {
  return request.post<SupplementPrint.Response>(
    `/storehouse/cjProductSub/printAgain`,
    data,
  );
}

/**分标新确认 */
export function minuteMarkNewConfirm(data: MinuteMarkNewConfirm.Request) {
  return request.post<MinuteMarkNewConfirm.Response>(
    `/storehouse/cjProductSub/confirmBatchSubStandard`,
    data,
  );
}

/**分标单次确认-生成批次号  */
export function confirmSingleSub(data: ConfirmSingleSub.Request) {
  return request.post<ConfirmSingleSub.Response>(
    `/storehouse/cjProductSub/confirmSingleSub`,
    data,
  );
}

/**撤回分标 */
export function recallSub(data: RecallSub.Request) {
  return request.post<RecallSub.Response>(
    `/storehouse/cjProductSub/recallSub`,
    data,
  );
}

/**pod 扫描包裹 */
export function podOrderList(data: PodOrderList.Request) {
  return request.post<PodOrderList.Response>(
    `/storehouse/storehouseReceiptPodOrder/getReceiptPodOrderList`,
    data,
  );
}

/**pod 确认 */
export function submitPodOrder(data: SubmitPodOrder.Request) {
  return request.post<SubmitPodOrder.Response>(
    `/storehouse/storehouseReceiptPodOrder/submitPodOrder`,
    data,
  );
}

/**包装商品打印 */
export function productPrint(data: PrintRequest.Request) {
  return request.post<PrintRequest.Response>(
    `/storehouse/storehouseReceiptPodOrder/printPodBarcode`,
    data,
  );
}
