import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/inventoryBatchNo';
import { dateTimeFormat } from '@/utils';
import moment from 'moment';
export default {
  namespace: 'inventoryBatchNo',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('inventoryBatchNo', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.storehouseId,
          checkNum: searchParams.checkNum,
          batchNum: searchParams.batchNum,
          status: searchParams.status,
          createBy: searchParams.createBy,
          updateBy: searchParams.updateBy,
        },
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        beginDate: searchParams.createTime
          ? moment(
              `${searchParams.createTime[0].format('YYYY-MM-DD')} 00:00:00`,
            ).format('YYYY-MM-DD HH:mm:ss')
          : '',
        endDate: searchParams.createTime
          ? moment(
              `${searchParams.createTime[1].format('YYYY-MM-DD')} 00:00:00`,
            ).format('YYYY-MM-DD HH:mm:ss')
          : '',
        secondBeginDate: searchParams.updateTime
          ? moment(
              `${searchParams.updateTime[0].format('YYYY-MM-DD')} 00:00:00`,
            ).format('YYYY-MM-DD HH:mm:ss')
          : '',
        secondEndDate: searchParams.updateTime
          ? moment(
              `${searchParams.updateTime[1].format('YYYY-MM-DD')} 00:00:00`,
            ).format('YYYY-MM-DD HH:mm:ss')
          : '',
      } as any);
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
