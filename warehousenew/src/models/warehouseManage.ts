import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/warehouseManage';
import { SELECTOPTION } from '@/enum.config';

export default {
  namespace: 'warehouseManage',
  state: {
    ...formSearch.state,
    searchData: { selectedOption: 1 },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('warehouseManage', async searchParams => {
      const resp = await api.getList({
        data: {
          storehouseId: searchParams.warehouse,
          type: searchParams.warehouseType,
          areaName:
            SELECTOPTION.warehouseNumber.key === searchParams.selectedOption
              ? searchParams.warehouseNumber
              : undefined,
          categoryId:
            SELECTOPTION.warehouseCommodityType.key ===
            searchParams.selectedOption
              ? searchParams.warehouseCommodityType
              : undefined,
          isDelete: searchParams.ifDisable,
        },
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
