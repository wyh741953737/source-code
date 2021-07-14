import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/inventoryTurnOver';

export const namespace = 'overSku';
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
      const {
        sku,
        notDeductionDay,
        shortCode,
        endAvailableQuantity,
        startAvailableQuantity,
        storehouseId,
        outQuantityType,
        outQuantity,
        turnOverDayType,
        startTurnOverDay,
        endTurnOverDay,
        customerName,
      } = searchParams;
      const resp = await api.getskuList({
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
        data: {
          storehouseId,
          sku,
          shortCode,
          notDeductionDay,
          customerName,
          startAvailableQuantity,
          endAvailableQuantity,
          weekOutQuantity: outQuantityType === 'week' ? outQuantity : undefined,
          monthOutQuantity:
            outQuantityType === 'month' ? outQuantity : undefined,
          threeMonthOutQuantity:
            outQuantityType === 'threeMonths' ? outQuantity : undefined,
          startWeekTurnoverDay:
            turnOverDayType === 'week' ? startTurnOverDay : undefined,
          endWeekTurnoverDay:
            turnOverDayType === 'week' ? endTurnOverDay : undefined,
          startMonthTurnoverDay:
            turnOverDayType === 'month' ? startTurnOverDay : undefined,
          endMonthTurnoverDay:
            turnOverDayType === 'month' ? endTurnOverDay : undefined,
          startThreeMonthTurnoverDay:
            turnOverDayType === 'threeMonths' ? startTurnOverDay : undefined,
          endThreeMonthTurnoverDay:
            turnOverDayType === 'threeMonths' ? endTurnOverDay : undefined,
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
