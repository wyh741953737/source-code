import * as api from '@/services/cannibalize';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';

export const namespace = 'cannibalize';
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
      const [beginDate, endDate] = momentRangeSplit(searchParams.createTime);
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate,
        endDate,
        data: {
          transferCode: searchParams.transferCode,
          outboundOrder: searchParams.outboundOrder,
          putStorageNumber: searchParams.putStorageNumber,
          targetStorehouseId: searchParams.targetStorehouseId,
          sourceStorehouseId: searchParams.sourceStorehouseId,
          createBy: searchParams.createBy,
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
