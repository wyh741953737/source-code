import * as api from '@/services/soringManage';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'soringManage';
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
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          storehouseId: searchParams.storehouseId,
          batchId: searchParams.batchId,
          variantNum: searchParams.variantNum,
          variantSku: searchParams.variantSku,
          containerNum: searchParams.containerNum,
          sortedBy: searchParams.sortedBy,
          sortingStatus: searchParams.sortingStatus,
          sortedContainer: searchParams.sortedContainer,
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
