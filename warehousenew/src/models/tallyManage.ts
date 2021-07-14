import * as api from '@/services/tallyManage';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';

export const namespace = 'tallyManage';
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
          tallyNum: searchParams.tallyNum,
          type: searchParams.type,
          storehouseId: searchParams.storehouseId,
          status: searchParams.status,
          createBy: searchParams.createBy,
          tallySource: searchParams.tallySource,
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
