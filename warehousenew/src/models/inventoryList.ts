import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/inventoryList';
import { dateTimeFormat } from '@/utils';
import moment from 'moment';
export default {
  namespace: 'inventoryList',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('inventoryList', async searchParams => {
      console.log(searchParams);

      const resp = await api.getList({
        data: {
          storehouseId: searchParams.storehouseId,
          checkNum: searchParams.checkNum,
          type: searchParams.type,
          status: searchParams.status,
          checkType: searchParams.checkType,
          checkDimension: searchParams.checkDimension,
          isFrozen: searchParams.isFrozen,
          startTime: searchParams?.createTime
            ? moment(
                `${searchParams.createTime[0].format('YYYY-MM-DD')} 00:00:00`,
              ).format('YYYY-MM-DD HH:mm:ss')
            : '',
          endTime: searchParams?.createTime
            ? moment(
                `${searchParams.createTime[1].format('YYYY-MM-DD')} 23:59:59`,
              ).format('YYYY-MM-DD HH:mm:ss')
            : '',
          createBy: searchParams.createBy,
        } as any,
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
