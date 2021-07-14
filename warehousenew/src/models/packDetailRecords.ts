import * as api from '@/services/packDetailRecords';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';
export const namespace = 'packDetailRecords';
export default {
  namespace,
  state: {
    ...formSearch.state,
    searchData: {
      ...formSearch.state.searchData,
      sortingStatus: 0,
    },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const [sTime, eTime] = momentRangeSplit(
        searchParams.packTime,
        'YYYY-MM-DD hh:mm:ss',
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          variantSku: searchParams.variantSku,
          variantNum: searchParams.variantNum,
          batchId: searchParams.batchId,
          storehouseId: searchParams.storehouseId,
          createBy: searchParams.createBy,
          orderId: searchParams.orderId,
          trackingNumber: searchParams.trackingNumber,
          locationName: searchParams.locationName,
          sTime,
          eTime,
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
