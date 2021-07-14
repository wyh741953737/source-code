import * as common from '@/services/common';
import { message } from 'antd';

interface State {
  warehouseId: string | undefined;
}

export default {
  namespace: 'common',
  state: {
    warehouseId: undefined,
    logVisible: false,
    logInfo: [],
  },
  reducers: {
    warehouseChange: (
      state: State,
      { payload }: { payload: { warehouseId: string } },
    ) => {
      return { ...state, warehouseId: payload.warehouseId };
    },
    _logVisibleChange(
      state: any,
      { payload }: { payload: { visible: boolean; data?: object } },
    ) {
      return { ...state, logVisible: payload.visible, logInfo: payload.data };
    },
  },
  effects: {
    *getLog({ payload }: any, { call, put, select }: any) {
      const hide = message.loading('正在获取日志中...', 0);
      try {
        // const resp = yield call(common.getLog, { ids: payload.id });

        yield put({
          type: '_logVisibleChange',
          payload: { visible: true, data: [] },
        });
      } catch (e) {
      } finally {
        hide();
      }
    },
  },
};
