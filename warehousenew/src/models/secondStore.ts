import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/secondStore';
import { message } from 'antd';

export default {
  namespace: 'secondStore',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('secondStore', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.warehouse,
          type: searchParams.storeType,
          customerId: searchParams.shipperId,
          customerName: searchParams.shipperName,
        },
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
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
