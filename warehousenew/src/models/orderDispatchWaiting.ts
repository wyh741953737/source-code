import * as api from '@/services/orderDispatch';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'orderDispatchWaiting';
import storage from '@/utils/storage';
const orderDispatchItem = storage.localGet('orderDispatchItem');
export default {
  namespace,
  state: {
    ...formSearch.state,
    currentItem: orderDispatchItem ? orderDispatchItem : {},
  },
  reducers: {
    ...formSearch.reducers,
    _changecurrentItem(state: any, { payload }: any) {
      storage.localSet(
        'orderDispatchItem',
        JSON.stringify(payload.currentItem),
      );
      return {
        ...state,
        currentItem: payload.currentItem,
      };
    },
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const resp = await api.getList({
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
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
