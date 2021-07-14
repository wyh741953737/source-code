import * as api from '@/services/storeAdjust';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';

export const namespace = 'storeAdjust';
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
        searchParams.updateTime,
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
          alterCodes:
            searchParams.alterCodes && searchParams.alterCodes.split(','),
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
