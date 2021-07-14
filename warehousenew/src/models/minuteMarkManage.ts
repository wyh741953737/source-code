import { formSearch } from '@/utils/stateUtil';
import * as api_minuteMarkManage from '@/services/minuteMarkManage';
import { message } from 'antd';

export default {
  namespace: 'minuteMarkManage',
  state: {
    ...formSearch.state,
    searchData: {
      queryType: 1,
      queryTypeValue: null,
      subStandardStatus: 0,
      beginDate: null,
      endDate: null,
    },
    logVisible: false,
    logInfo: {},
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
    ...formSearch.effects('minuteMarkManage', async searchParams => {
      const resp = await api_minuteMarkManage.getSubPage({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          storageId: searchParams.storageId,
          queryType: searchParams.queryType,
          queryTypeValue: searchParams.queryTypeValue,
          subStandardStatus: searchParams.subStandardStatus,
          beginDate: searchParams.beginDate,
          endDate: searchParams.endDate,
        },
      });
      return {
        dataSource: resp.data.content,
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
