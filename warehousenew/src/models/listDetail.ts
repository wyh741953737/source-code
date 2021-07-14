import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/outboundRecord';
import { message } from 'antd';
export default {
  namespace: 'listDetail',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('listDetail', async searchParams => {
      console.log(searchParams, 'searchParams=======');
      const resp = await api.getListDetail({
        data: {
          packageNumber: searchParams.packageNumber,
          printBy: searchParams.printBy,
          storageId: searchParams.storageId,
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
  },
};
