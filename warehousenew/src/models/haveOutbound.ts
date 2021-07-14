import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/weightOutbound';
import { message } from 'antd';
export default {
  namespace: 'haveOutbound',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('haveOutbound', async searchParams => {
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
  },
};
