import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/libraryList';
import { message } from 'antd';
export default {
  namespace: 'libraryList',
  state: {
    ...formSearch.state,
    currentItem: {},
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
    ...formSearch.effects('libraryList', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.storageId,
          id: searchParams.id,
          status: searchParams.status,
          checkName: searchParams.checkName,
          sku: searchParams.sku,
        },
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current || 1,
        beginDate: searchParams.beginDate,
        endDate: searchParams.endDate,
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
    *getDeatil({ payload }: any, { call }: any) {
      try {
        return yield call(api.getList, payload);
      } catch (e) {}
    },
  },
};
