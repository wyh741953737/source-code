import * as api from '@/services/shelfDetailRecords';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';
export const namespace = 'shelfDetailRecords';
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
      const [beginDate, endDate] = momentRangeSplit(
        searchParams.shelfTime,
        'YYYY-MM-DD hh:mm:ss',
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate,
        endDate,
        data: {
          variantSku: searchParams.variantSku,
          productSku: searchParams.productSku,
          variantNum: searchParams.variantNum,
          storehouseId: searchParams.storehouseId,
          createBy: searchParams.createBy,
          locationName: searchParams.locationName,
          batchNumber: searchParams.batchNumber,
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
