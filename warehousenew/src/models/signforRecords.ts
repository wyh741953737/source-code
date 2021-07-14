import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/signforRecords';
import { momentRangeSplit } from '@/utils';

export const namespace = 'signforRecordss';

export default {
  namespace,
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const [startScanDate, endScanDate] = momentRangeSplit(
        searchParams.createTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          putStorageNumber: searchParams.putStorageNumber,
          orderNumber: searchParams.orderNumber,
          trackingNumber: searchParams.trackingNumber,
          storageId: searchParams.storageId,
          scanName: searchParams.scanName,
          signStatus: searchParams.signStatus,
          startScanDate,
          endScanDate,
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
