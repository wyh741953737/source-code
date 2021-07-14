import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/abnormalOfExpress';

export const namespace = 'abnormalOfExpress';
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
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        data: {
          storehouseId: searchParams.storehouseId,
          packCode: searchParams.packCode,
          orderId: searchParams.orderId,
          sheetStatus: searchParams.sheetStatus,
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
