import * as api from '@/services/warehouseWarrant';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'warehouseWarrantFinder';
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
      const [beginDate, endDate] = searchParams.createTime || [];
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate: beginDate?.format('YYYY-MM-DD'),
        endDate: endDate?.format('YYYY-MM-DD'),
        data: {
          status: searchParams.status,
          putStorageNumber: searchParams.warehouseEntryNumber,
          purchaser: searchParams.purchasingAgent,
          orderNumber: searchParams.purchaseOrderNumber,
          type: searchParams.warehouseEntryType,
          logisticsTrackingNumbers: searchParams.trackingNumber,
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
