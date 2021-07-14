import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/performanceList';
import { message } from 'antd';
export default {
  namespace: 'performanceLog',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('performanceLog', async searchParams => {
      const { current, pageSize } = searchParams;
      const resp = await api.getLogList({
        startTime: searchParams.startTime,
        endTime: searchParams.endTime,
        storeId: searchParams.storeId,
        group: searchParams.group,
        employeeId: searchParams.employeeId,
        pageNum: current,
        pageSize: pageSize,
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
