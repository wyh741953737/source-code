import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/moveInWarehouse';

export default {
  namespace: 'moveInWarehouse',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('moveInWarehouse', async searchParams => {
      const [createStart, createEnd] = searchParams.createTime || [];
      const [moveStart, moveEnd] = searchParams.moveTime || [];
      const resp = await api.getList({
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        data: {
          moveCode: searchParams.moveId,
          storehouseId: searchParams.warehouse,
          customerName: searchParams.shipperName,
          moveType: searchParams.moveType,
          status: searchParams.moveStatus,
          containerNum: searchParams.fromContainer,
          toContainerNum: searchParams.toContainer,
          createBy: searchParams.createPerson,
          updateBy: searchParams.movePerson,
          createAtBegin: createStart && createStart.format('YYYY-MM-DD'),
          createAtEnd: createEnd && createEnd.format('YYYY-MM-DD'),
          updateAtBegin: moveStart && moveStart.format('YYYY-MM-DD'),
          updateAtEnd: moveEnd && moveEnd.format('YYYY-MM-DD'),
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
