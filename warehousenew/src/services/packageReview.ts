import request from '@/utils/request';
import { GetList, ReinspectionOrder } from './packageReview.d';

import { reportLocalAudio } from '@/utils/report';

/**
 * 根据容器获取订单
 * @param data
 */
export async function getList(
  data: GetList.Request,
): Promise<GetList.ResponseTrans> {
  try {
    const response = await request.get<GetList.Response>(
      '/storehouse/storehouseBatchSortedRecord/getVerificationOrder',
      { params: data },
    );
    return response.data.map(d => {
      return {
        ...d,
        id: d.orderId,
        pendingVerify: d.uninspectedQuantity,
        processedVerify: d.goodQuantity,
        list: d.storehouseBatchSortedRecordDTOS.map(s => {
          return {
            ...s,
            sku: s.variantNum,
            pendingVerify: s.uninspectedQuantity,
            processedVerify: s.goodQuantity,
            batchMap: {},
          };
        }),
      };
    });
  } catch (error) {
    reportLocalAudio([error.message]);
    return Promise.reject();
  }
}

/**
 * 确认复核
 * @param data
 */
export function reinspectionOrder(data: ReinspectionOrder.Request) {
  return request.post<ReinspectionOrder.Response>(
    '/storehouse/storehousePack/reinspectionOrder',
    data,
  );
}
