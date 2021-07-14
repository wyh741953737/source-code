import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/packageRecord';
import { momentRangeSplit } from '@/utils';

export const namespace = 'packageRecords';

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
      const [beginDate, endDate] = momentRangeSplit(
        searchParams.createTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate: beginDate || '',
        endDate: endDate || '',
        data: {
          packCode: searchParams.packCode,
          orderId: searchParams.orderId,
          trackingNumber: searchParams.trackingNumber,
          storehouseId: searchParams.storehouseId,
          createBy: searchParams.createBy,
          variantSku: searchParams.variantSku,
          packStatus: searchParams.packStatus,
          variantNum: searchParams.variantNum,
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
