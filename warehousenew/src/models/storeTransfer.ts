import * as api from '@/services/storeTransfer';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';

export const namespace = 'storeTransfer';
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
      const [secondBeginDate, secondEndDate] = momentRangeSplit(
        searchParams.transTime,
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate,
        endDate,
        secondBeginDate,
        secondEndDate,
        data: {
          storehouseId: searchParams.storehouseId,
          variantSku: searchParams.variantSku,
          locationName: searchParams.locationName,
          status: searchParams.status,
          createBy: searchParams.createBy,
          updateBy: searchParams.updateBy,
          transferCodes:
            searchParams.transferCodes && searchParams.transferCodes.split(','),
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
