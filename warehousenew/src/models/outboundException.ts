import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/outboundException';
import { message } from 'antd';

export default {
  namespace: 'outboundException',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('outboundException', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.storehouseId,
          createBy: searchParams.createBy,
          abnormalType: searchParams.abnormalType,
        },
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
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
  },
};
