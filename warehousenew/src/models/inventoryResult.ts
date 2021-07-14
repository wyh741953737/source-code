import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/inventoryResult';
import { momentRangeSplit } from '@/utils';
import moment from 'moment';
export const namespace = 'inventoryResult';
export default {
  namespace: 'inventoryResult',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('inventoryResult', async searchParams => {
      const [beginDate, endDate] = momentRangeSplit(searchParams.createTime);
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          checkNum: searchParams.checkNum,
          type: searchParams.type,
          storehouseId: searchParams.storehouseId,
          checkType: searchParams.checkType,
          status: searchParams.status,
          isFrozen: searchParams.isFrozen,
          updateBy: searchParams.updateBy,
          startTime: beginDate ? `${beginDate} 00:00:00` : undefined,
          endTime: endDate ? `${endDate} 23:59:59` : undefined,
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
