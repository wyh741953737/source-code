import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/positionManage';
import { message } from 'antd';

export default {
  namespace: 'positionManage',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('positionManage', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.warehouse,
          locationName: searchParams.positionNumber,
          type: searchParams.positionType,
          isDelete: searchParams.ifDisable,
          areaName: searchParams.position,
        },
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
