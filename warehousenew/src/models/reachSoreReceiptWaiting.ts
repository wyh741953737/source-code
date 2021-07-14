import * as api from '@/services/orderDispatch';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'reachSoreReceiptWaiting';
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
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate: searchParams.beginDate,
        endDate: searchParams.endDate,
        data: {
          dispatchNumber: searchParams.dispatchNumber,
          status: searchParams.status,
          sourceStorehouseId: searchParams.sourceStorehouseId,
          targetStorehouseId: searchParams.targetStorehouseId,
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
