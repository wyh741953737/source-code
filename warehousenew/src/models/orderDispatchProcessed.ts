import * as api from '@/services/orderDispatch';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'orderDispatchProcessed';
export default {
  namespace,
  state: {
    ...formSearch.state,
    searchData: {
      ...formSearch.state.searchData,
      type: 1,
    },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      let resp: any = null;
      if (searchParams.type === 1) {
        resp = await api.haveSignedPackage({
          pageSize: searchParams.pageSize,
          pageNum: searchParams.current,
          beginDate: searchParams.beginDate,
          endDate: searchParams.endDate,
          data: {
            property: searchParams.property,
            parcelNumber: searchParams.parcelNumber,
            trackingNumber: searchParams.trackingNumber,
          },
        });
      } else {
        resp = await api.getList({
          pageSize: searchParams.pageSize,
          pageNum: searchParams.current,
          beginDate: searchParams.beginDate,
          endDate: searchParams.endDate,
          data: {
            dispatchNumber: searchParams.dispatchNumber,
            status: searchParams.status,
            sourceStorehouseId: searchParams.sourceStorehouseId,
            targetStorehouseId: searchParams.targetStorehouseId,
            goodsLoanName: searchParams.goodsLoanName,
            parcelNumber: searchParams.parcelNumber,
            trackingNumber: searchParams.trackingNumber,
            parcelOrWaybillNumber: searchParams.parcelOrWaybillNumber,
            createBy: searchParams.createBy,
          },
        });
      }

      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
