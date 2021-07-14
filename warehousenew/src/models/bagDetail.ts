import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/outboundRecord';
import { getLogisticList } from '@/services/weightConfig';
import { message } from 'antd';
export default {
  namespace: 'bagDetail',
  state: {
    ...formSearch.state,
    logisticList: [],
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
    ...formSearch.effects('bagDetail', async searchParams => {
      const resp = await api.getForwardDetail({
        data: {
          logisticsCompany: searchParams.logisticsCompany,
          logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
          orderId: searchParams.orderId,
          storageId: searchParams.storageId,
          onlineStatus: searchParams.onlineStatus,
          signingCountry: searchParams.signingCountry,
          weightPackageId: searchParams.weightPackageId,
          receiveRecordId: searchParams.receiveRecordId,
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
    *saveLogistic({ payload }: any, { call, put, select }: any) {
      const resp = yield getLogisticList();
      if (resp && resp.data) {
        yield put({
          type: '_changeState',
          payload: {
            logisticList: resp.data,
          },
        });
      }
    },
  },
};
