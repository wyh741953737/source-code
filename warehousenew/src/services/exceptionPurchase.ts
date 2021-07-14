import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import {
  GetList,
  DealReissue,
  DealRefund,
  DealPartsReissue,
  DealQualified,
  DealReturnAndChange,
  DealReturnAndRefund,
  DealSignPart,
  DealSKUChange,
  DetailForDeal,
  Confirm,
  ValidateSku,
} from './exceptionPurchase.d';

/** 获取异常记录列表 */
export function getList(
  data: GetList.Request,
): PromiseSuccessResponse<GetList.Response> {
  return request.post(`/storehouse-sign-web/purchase/list`, data);
}

/** 仅补发 */
export function dealReissue(
  data: Array<DealReissue.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addExceptionReissue`,
    data,
  );
}

/** 仅退款 */
export function dealRefund(
  data: Array<DealRefund.Request>,
): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/purchase/addExceptionRefund`, data);
}

/** 仅补发配件 */
export function dealPartsReissue(
  data: Array<DealPartsReissue.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addExceptionReplacementAccessories`,
    data,
  );
}

/** 合格 */
export function dealQualified(
  data: Array<DealQualified.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addExceptionQualified`,
    data,
  );
}

/** 退货换货 */
export function dealReturnAndChange(
  data: Array<DealReturnAndChange.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addExceptionReturnExchange`,
    data,
  );
}

/** 退货退款 */
export function dealReturnAndRefund(
  data: Array<DealReturnAndRefund.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/addExceptionRefunds`,
    data,
  );
}

/** 部分签收 */
export function dealSignPart(
  data: Array<DealSignPart.Request>,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/updatePartialReceipt`,
    data,
  );
}

/** 变更sku */
export function dealSKUChange(
  data: Array<DealSKUChange.Request>,
): PromiseSuccessResponse {
  return request.post(`/storehouse-sign-web/purchase/updatePurchaseSku`, data);
}

/** 查看处理详情 */
export function detailForDeal(
  data: DetailForDeal.Request,
): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/inbound/getReceiptDetailById`,
    data,
  );
}

/**
 * 确认处理
 * @param data
 */
export function confirm(data: Confirm.Request): PromiseSuccessResponse {
  return request.post(
    `/storehouse-sign-web/purchase/updateReceiptExceptionStatusByIdList`,
    data,
  );
}

/**
 * 校验sku
 * @param data
 */
export function validateSku(data: ValidateSku.Request) {
  return request.post(
    `/storehouse-sign-web/productApi/getVariantBySkuList`,
    data,
  );
}
