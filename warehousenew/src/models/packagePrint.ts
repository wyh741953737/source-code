import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/packagePrint';
import { message } from 'antd';
export default {
  namespace: 'packagePrint',
  state: {
    ...formSearch.state,
    logVisible: false,
    logInfo: [],
  },
  reducers: {
    ...formSearch.reducers,
    _logVisibleChange(
      state: any,
      { payload }: { payload: { visible: boolean; data?: object } },
    ) {
      return { ...state, logVisible: payload.visible, logInfo: payload.data };
    },
  },
  effects: {
    ...formSearch.effects('packagePrint', async searchParams => {
      const resp = await api.getList({
        data: {
          printBy: searchParams.printBy,
          storageId: searchParams.storageId,
          trackingNumber: searchParams.trackingNumber,
        },
        beginDate: searchParams.beginDate,
        endDate: searchParams.endDate,
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
