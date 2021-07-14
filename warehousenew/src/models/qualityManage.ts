import { formSearch } from '@/utils/stateUtil';
import * as api_qualityManage from '@/services/qualityManage';
import { message } from 'antd';

export default {
  namespace: 'qualityManage',
  state: {
    ...formSearch.state,
    searchData: {
      status: 0,
      queryType: 1,
      queryTypeValue: null,
      beginDate: null,
      endDate: null,
      containerNum: '',
    },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('qualityManage', async searchParams => {
      const resp = await api_qualityManage.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          storageId: searchParams.storageId,
          status: searchParams.status,
          queryType: searchParams.queryType,
          queryTypeValue: searchParams.queryTypeValue,
          beginDate: searchParams.beginDate,
          endDate: searchParams.endDate,
          containerNum: searchParams.containerNum,
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
