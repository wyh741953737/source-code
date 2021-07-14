import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/abnormalOfLost';
import { momentRangeSplit } from '@/utils';

export const namespace = 'abnormalOfLost';
export default {
  namespace,
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const [stockoutTimeStart, stockoutTimeEnd] = momentRangeSplit(
        searchParams.createAt,
        'YYYY-MM-DD HH:mm:ss',
      );

      const resp = await api.getList({
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        data: {
          clientOrderId: searchParams.clientOrderId,
          orderId: searchParams.orderId,
          logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
          sku: searchParams.sku,
          variantNum: searchParams.variantNum,
          createBy: searchParams.stockoutName,
          operatorName: searchParams.operatorName,
          storehouseId: searchParams.storehouseId,
          status: searchParams.status,
          stockoutTimeStart,
          stockoutTimeEnd,
        },
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
