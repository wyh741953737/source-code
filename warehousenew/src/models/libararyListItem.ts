import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/libraryList';

export default {
  namespace: 'libraryListItem',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
    saveCurrentItem(
      state: any,
      { payload }: { payload: { visible: boolean; data?: object } },
    ) {
      return { ...state, currentItem: { ...payload } };
    },
  },
  effects: {
    ...formSearch.effects('libraryListItem', async searchParams => {
      const resp = await api.getDetailList({
        data: {
          batchNumber: searchParams.batchNumber,
        },
        pageSize: searchParams.pageSize || 10,
        pageNum: searchParams.current || 1,
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
