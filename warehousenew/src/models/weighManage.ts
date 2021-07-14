import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/weighManage';
import { message } from 'antd';

export default {
  namespace: 'weighManage',
  state: {
    ...formSearch.state,
    searchData: {
      status: 0,
      queryType: '1',
      queryTypeValue: null,
      beginDate: null,
      endDate: null,
    },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('weighManage', async searchParams => {
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          storageId: searchParams.storageId,
          status: searchParams.status,
          queryType: searchParams.queryType,
          queryTypeValue: searchParams.queryTypeValue,
          beginDate: searchParams.beginDate,
          endDate: searchParams.endDate,
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
