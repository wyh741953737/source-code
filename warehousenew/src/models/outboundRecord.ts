import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/outboundRecord';
import { getLogisticList } from '@/services/weightConfig';
import { message } from 'antd';
export default {
  namespace: 'outboundRecord',
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
    ...formSearch.effects('outboundRecord', async searchParams => {
      const resp = await api.getList({
        data: {
          receiveNumber: searchParams.receiveNumber,
          storageId: searchParams.storageId,
          logisticsCompany: searchParams.logisticsCompany,
          printBy: searchParams.printBy,
          printStatus: searchParams.printStatus,
          logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
          orderId: searchParams.orderId,
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
