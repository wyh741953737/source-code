import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/weightConfig';
import { message } from 'antd';
export default {
  namespace: 'weightConfig',
  state: {
    ...formSearch.state,
    thresholdVal: {
      id: null,
      ruleKey: null,
      number: null,
      createId: null,
    },
    logisticData: [],
  },
  reducers: {
    ...formSearch.reducers,
    _changeState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    ...formSearch.effects('weightConfig', async searchParams => {
      const resp = await api.getList({
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
    *saveThreshold({ payload }: any, { call, put, select }: any) {
      const resp = yield api.searchThresholdVal();
      if (resp.data) {
        yield put({
          type: '_changeState',
          payload: {
            thresholdVal: resp.data,
          },
        });
      }
    },
    *saveLogistic({ payload }: any, { call, put, select }: any) {
      const resp = yield api.getLogisticList();
      if (resp && resp.data) {
        yield put({
          type: '_changeState',
          payload: {
            logisticData: resp.data,
          },
        });
      }
    },
  },
};
