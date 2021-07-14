import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/warehouseWarrant';

export default {
  namespace: 'warehouseWarrantDetail',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('warehouseWarrantDetail', async searchParams => {
      const resp = await api.getDetail({
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        data: { putStorageNumberId: searchParams.id },
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
