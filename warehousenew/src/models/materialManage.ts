import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/materialManage';
import * as common from '@/services/common';
import { message } from 'antd';

export default {
  namespace: 'materialManage',
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
    ...formSearch.effects('materialManage', async searchParams => {
      const { cNumber, cName, isDelete, current, pageSize } = searchParams;
      const resp = await api.getList({
        pageNum: current,
        pageSize: pageSize,
        data: {
          cNumber,
          cName,
          isDelete,
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
