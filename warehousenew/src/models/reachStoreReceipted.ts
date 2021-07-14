import * as api from '@/services/orderDispatch';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'reachStoreReceipted';
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
      const resp = await api.haveSignedPackage({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate: searchParams.beginDate,
        endDate: searchParams.endDate,
        data: {
          dispatchType: searchParams.dispatchType,
          parcelNumber: searchParams.parcelNumber,
          trackingNumber: searchParams.trackingNumber,
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
