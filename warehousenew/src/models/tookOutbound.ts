// import * as api from '@/services/tookOutbound';
import * as common from '@/services/common';
import { message } from 'antd';

export default {
  namespace: 'tookOutbound',
  state: {
    dataList: [],
    loading: false,
  },
  reducers: {
    _dataChange(state: any, { payload }: { payload: { data: object } }) {
      return { ...state, dataList: payload.data };
    },
    _changeLoadingStatus(state: any, { payload }: any) {
      return { ...state, loading: payload.loading };
    },
  },
  effects: {
    *getList({ payload }: any, { call, put, select }: any) {
      yield put({
        type: '_changeLoadingStatus',
        payload: { loading: true },
      });
      try {
        // const resp = yield call(api.getList);
        // yield put({
        //   type: '_dataChange',
        //   payload: { data: resp.data },
        // });
      } catch (e) {
      } finally {
        yield put({
          type: '_changeLoadingStatus',
          payload: { loading: false },
        });
      }
    },
  },
};
