import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/firstStore';
import { message } from 'antd';

export default {
  namespace: 'firstStore',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('firstStore', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.warehouse,
          type: searchParams.storeType,
        },
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
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
