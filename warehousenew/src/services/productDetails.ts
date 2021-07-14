import request from '@/utils/request';
import { PromiseSuccessResponse } from '@/utils/serviceResponse';

import { GetProductDetail } from './productDetails.d';

/** 查询商品详情 */
export function getProductDetail(
  data: GetProductDetail.Request,
): PromiseSuccessResponse<GetProductDetail.Response> {
  return request.post(`/storehouse/inspect/getProductInfo`, data);
}
