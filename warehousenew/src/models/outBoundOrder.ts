import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/outBoundOrder';
import * as common from '@/services/common';
import { message } from 'antd';
import storage from '@/utils/storage';
import { AUTH } from '~/authority';

const OUTBOUNDITEM = storage.localGet('outBoundItem');
export default {
  namespace: 'outBoundOrder',
  state: {
    ...formSearch.state,
    searchData: {
      status: '',
    },
    logVisible: false,
    logInfo: [],

    tabData: [
      {
        value: '全部',
        columnTag: 'normal',
        key: '',
        code: AUTH.CKCDCKCX002,
      },
      {
        value: '待处理(0)',
        columnTag: 'normal',
        key: 10,
        code: AUTH.CKCDCKCX003,
      },
      {
        value: '待配齐(0)',
        columnTag: 'normal',
        key: 0,
        code: AUTH.CKCDCKCX004,
      },
      {
        value: '已配齐(0)',
        columnTag: 'normal',
        key: 1,
        code: AUTH.CKCDCKCX005,
      },
      {
        value: '待拣货(0)',
        columnTag: 'normal',
        key: 2,
        code: AUTH.CKCDCKCX006,
      },
      {
        value: '待分拣(0)',
        columnTag: 'normal',
        key: 3,
        code: AUTH.CKCDCKCX007,
      },
      {
        value: '待验货(0)',
        columnTag: 'normal',
        key: 4,
        code: AUTH.CKCDCKCX008,
      },
      {
        value: '待称重(0)',
        columnTag: 'normal',
        key: 5,
        code: AUTH.CKCDCKCX009,
      },
      {
        value: '已出库(0)',
        columnTag: 'normal',
        key: 6,
        code: AUTH.CKCDCKCX010,
      },
      {
        value: '异常订单(0)',
        columnTag: 'except',
        key: 8,
        code: AUTH.CKCDCKCX011,
      },
      {
        value: '异常结束(0)',
        columnTag: 'ended',
        key: 9,
        code: AUTH.CKCDCKCX012,
      },
      {
        value: '超时未处理(0)',
        columnTag: 'timeout',
        key: 7,
        code: AUTH.CKCDCKCX013,
      },
      {
        value: '面单过期(0)',
        columnTag: 'normal',
        key: 12,
      },
      {
        value: '验单缺货(0)',
        columnTag: 'normal',
        key: 13,
      },
    ],
    columnTag: 'normal',
    currentItem: OUTBOUNDITEM ? OUTBOUNDITEM : {},
  },
  reducers: {
    ...formSearch.reducers,
    _logVisibleChange(
      state: any,
      { payload }: { payload: { visible: boolean; data?: object } },
    ) {
      return { ...state, logVisible: payload.visible, logInfo: payload.data };
    },
    _statusChange(
      state: any,
      {
        payload,
      }: { payload: { status: number; columnTag: string; data?: object } },
    ) {
      return {
        ...state,
        searchData: { ...state.searchData, status: payload.status },
        columnTag: payload.columnTag,
      };
    },
    _changecurrentItem(state: any, { payload }: any) {
      storage.localSet('outBoundItem', JSON.stringify(payload.currentItem));
      return {
        ...state,
        currentItem: payload.currentItem,
      };
    },
    _tabDataChange(state: any, { payload }: any) {
      return {
        ...state,
        tabData: payload.tabData,
      };
    },
  },
  effects: {
    ...formSearch.effects('outBoundOrder', async searchParams => {
      const {
        outboundOrder,
        storageId,
        orderId,
        status,
        shipmentsOrderId,
        type,
        clientOrderId,
        current,
        pageSize,
        controlStatus,
        createStartTime,
        createEndTime,
        deliveryStartTime,
        deliveryEndTime,
        logisticsTrackingNumber,
        isCountry,
        exceptionStatus,
        productSku,
        variantSku,
        changeStartTime,
        changeEndTime,
        salesmanName,
        completedStartTime,
        completedEndTime,
        customerName,
      } = searchParams;
      const resp = await api.getOrderList({
        pageNum: current,
        pageSize: pageSize,
        data: {
          outboundOrder,
          storageId,
          orderId,
          status,
          shipmentsOrderId,
          type,
          clientOrderId,
          controlStatus,
          createStartTime,
          createEndTime,
          deliveryStartTime,
          deliveryEndTime,
          logisticsTrackingNumber,
          isCountry,
          exceptionStatus,
          productSku,
          variantSku,
          changeStartTime,
          changeEndTime,
          salesmanName,
          completedStartTime,
          completedEndTime,
          customerName,
        },
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
    *getStatusCount({ payload }: any, { call, put, select }: any) {
      try {
        //@ts-ignore
        const resp = yield call(api.getStatusCount, {
          storageId: payload.storageId,
        });

        const {
          all,
          pending,
          toBeCompleted,
          completed,
          toBePicked,
          toBeSorted,
          pendingInspection,
          toBeWeighed,
          outOfStock,
          timeoutOutboundOrder,
          abnormalOrder,
          over,
          faceExpiredOrder,
          outOfStockInspection,
        } = resp.data;
        const tabData = [
          {
            value: `全部(${all})`,
            columnTag: 'normal',
            key: '',
            code: AUTH.CKCDCKCX002,
          },
          {
            value: `待处理(${pending || 0})`,
            columnTag: 'normal',
            key: 10,
            code: AUTH.CKCDCKCX003,
          },
          {
            value: `待配齐(${toBeCompleted || 0})`,
            columnTag: 'normal',
            key: 0,
            code: AUTH.CKCDCKCX004,
          },
          {
            value: `已配齐(${completed || 0})`,
            columnTag: 'normal',
            key: 1,
            code: AUTH.CKCDCKCX005,
          },
          {
            value: `待拣货(${toBePicked || 0})`,
            columnTag: 'normal',
            key: 2,
            code: AUTH.CKCDCKCX006,
          },
          {
            value: `待分拣(${toBeSorted || 0})`,
            columnTag: 'normal',
            key: 3,
            code: AUTH.CKCDCKCX007,
          },
          {
            value: `待验货(${pendingInspection || 0})`,
            columnTag: 'normal',
            key: 4,
            code: AUTH.CKCDCKCX008,
          },
          {
            value: `待称重(${toBeWeighed || 0})`,
            columnTag: 'normal',
            key: 5,
            code: AUTH.CKCDCKCX009,
          },
          {
            value: `已出库(${outOfStock || 0})`,
            columnTag: 'normal',
            key: 6,
            code: AUTH.CKCDCKCX010,
          },
          {
            value: `异常订单(${abnormalOrder || 0})`,
            columnTag: 'except',
            key: 8,
            code: AUTH.CKCDCKCX011,
          },
          {
            value: `异常结束(${over || 0})`,
            columnTag: 'ended',
            code: AUTH.CKCDCKCX012,
            key: 9,
          },
          {
            value: `超时未处理(${timeoutOutboundOrder || 0})`,
            columnTag: 'timeout',
            key: 7,
            code: AUTH.CKCDCKCX013,
          },
          {
            value: `面单过期(${faceExpiredOrder || 0})`,
            columnTag: 'normal',
            key: 12,
          },
          {
            value: `验单缺货(${outOfStockInspection || 0})`,
            columnTag: 'normal',
            key: 13,
          },
        ];
        yield put({
          type: '_tabDataChange',
          payload: { tabData: tabData },
        });
      } catch (e) {
      } finally {
        // hide();
      }
    },
  },
};
