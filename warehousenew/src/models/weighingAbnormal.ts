import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/weightOutbound';
import { message } from 'antd';
import { searchThresholdVal } from '@/services/weightConfig';
export default {
  namespace: 'weighingAbnormal',
  state: {
    ...formSearch.state,
    thresholdVal: {},
  },
  reducers: {
    ...formSearch.reducers,
    _changeThresholdVal(state: any, { payload }: any) {
      return {
        ...state,
        thresholdVal: payload.thresholdVal,
      };
    },
  },
  effects: {
    ...formSearch.effects('weighingAbnormal', async searchParams => {
      const resp = await api.getList({
        storageId: searchParams.storageId,
        outboundType: searchParams.outboundType,
        logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
        orderId: searchParams.orderId,
        logisticsCompany: searchParams.logisticsCompany,
        weighingTimeStart: searchParams.weighingTimeStart,
        weighingTimeEnd: searchParams.weighingTimeEnd,
        status: searchParams.status,
        companyAccount: searchParams.companyAccount,
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
    *saveThreshold({ payload }: any, { call, put, select }: any) {
      const resp = yield searchThresholdVal();
      yield put({
        type: '_changeThresholdVal',
        payload: {
          thresholdVal: resp.data,
        },
      });
    },
  },
};
