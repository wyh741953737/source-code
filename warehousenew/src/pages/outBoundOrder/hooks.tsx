import { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { history } from 'umi';
import useModal from '@/hooks/useModal';
import * as api from '@/services/outBoundOrder';
import useButton from '@/hooks/useButton';
import { dateTimeFormat } from '@/utils';
import { exportData } from '@/utils/exportData';
import { momentRangeSplit } from '@/utils';
export const searchFormHooks = (
  searchData: any,
  tabData: any,
  warehouseId: string,
  dispatch: Function,
  form: any,
) => {
  useEffect(() => {
    dispatch({
      type: 'outBoundOrder/search',
      payload: { searchData: { storageId: warehouseId } },
    });
    dispatch({
      type: 'outBoundOrder/getStatusCount',
      payload: { storageId: warehouseId },
    });
  }, [warehouseId]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const createTime = form.getFieldsValue().createTime;
    const [createStartTime, createEndTime] = momentRangeSplit(
      createTime,
      'YYYY-MM-DD HH:mm:ss',
    );
    const deliveryTime = form.getFieldsValue().deliveryTime;
    const [deliveryStartTime, deliveryEndTime] = momentRangeSplit(
      deliveryTime,
      'YYYY-MM-DD HH:mm:ss',
    );

    const upTime = form.getFieldsValue().upTime;
    const [changeStartTime, changeEndTime] = momentRangeSplit(
      upTime,
      'YYYY-MM-DD HH:mm:ss',
    );
    const completeAt = form.getFieldsValue().completeAt;
    const [completedStartTime, completedEndTime] = momentRangeSplit(
      completeAt,
      'YYYY-MM-DD HH:mm:ss',
    );

    dispatch({
      type: 'outBoundOrder/search',
      payload: {
        searchData: {
          ...values,
          status: searchData.status,
          createStartTime,
          createEndTime,
          deliveryStartTime,
          deliveryEndTime,
          changeStartTime,
          changeEndTime,
          completedStartTime,
          completedEndTime,
        },
      },
    });
    // dispatch({
    //   type: 'outBoundOrder/getStatusCount',
    //   payload: {},
    // });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'outBoundOrder/searchDataClear',
      payload: { status: searchData.status, storageId: warehouseId },
    });
    // dispatch({
    //   type: 'outBoundOrder/getStatusCount',
    //   payload: {},
    // });
  };

  return {
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (
  dispatch: Function,
  dataSource: any,
  searchData: any,
  tabData: any,
  warehouseId: string,
  form: any,
) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const [exceptModal] = useModal({
    onOk: async (values, p) => {
      const { controlStatus, remarks } = values;
      const { id, orderId, outboundOrder } = p;
      try {
        await api.exceptionProcess({
          controlStatus,
          remarks: remarks.trim(),
          id,
          orderId,
          outboundOrder,
        });
      } catch (e) {
        return false;
      }
      dispatch({ type: 'outBoundOrder/search', payload: {} });
      return true;
    },
  });

  const [printModal] = useModal();

  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'outBoundOrder/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const routerDetail = (id: string) => {
    history.push({
      pathname: '/outBoundDetail',
      query: { id: id },
    });
  };

  const showLog = async (id: string) => {
    const hide = message.loading('查询中，请稍后...');
    try {
      const resp = await api.getLog({ id });
      dispatch({
        type: 'outBoundOrder/_logVisibleChange',
        payload: { visible: true, data: resp.data },
      });
    } catch (error) {}
    hide();
  };

  const changeType = (key: any) => {
    const item = tabData.filter((item: any) => item.key == key);
    const columnTag = item.length > 0 ? item[0].columnTag : 'normal';
    dispatch({
      type: 'outBoundOrder/_statusChange',
      payload: {
        status: key,
        columnTag: columnTag,
      },
    });
    form.setFieldsValue({
      controlStatus: undefined,
      exceptionStatus: undefined,
      completeAt: '',
    });
    const values = form.getFieldsValue();
    dispatch({
      type: 'outBoundOrder/search',
      payload: {
        searchData: {
          ...searchData,
          ...values,
          completedEndTime: undefined,
          completedStartTime: undefined,
          status: key,
          storageId: warehouseId,
        },
      },
    });

    dispatch({
      type: 'outBoundOrder/getStatusCount',
      payload: { storageId: warehouseId },
    });
    setSelected({ keys: [], rows: [] });
  };

  // 抵扣库存
  const deductionStore = async () => {
    if (selected.rows.length === 0) {
      message.warn('至少选择一条记录');
      return Promise.reject();
    }
    Modal.confirm({
      title: '抵扣库存',
      content: '确定所选商品抵扣库存吗？',
      onOk: async () => {
        const orderIdList = selected.rows.map((item: any) => item.orderId);
        await api.deductionInventory({ orderIdList });
        message.success('抵扣成功');
        dispatch({
          type: 'outBoundOrder/search',
          payload: {},
        });
        setSelected({ keys: [], rows: [] });
      },
      onCancel: () => {},
    });
  };

  // 释放库存
  const releaseStore = async () => {
    if (selected.rows.length === 0) {
      message.warn('至少选择一条记录');
      return Promise.reject();
    }
    Modal.confirm({
      title: '释放库存',
      content: '确定所选商品释放库存吗？',
      onOk: async () => {
        const orderIdList = selected.rows.map((item: any) => item.orderId);
        await api.releaseInventory({ orderIdList });
        message.success('释放成功');
        dispatch({
          type: 'outBoundOrder/search',
          payload: {},
        });
        setSelected({ keys: [], rows: [] });
      },
      onCancel: () => {},
    });
  };
  /**直发单导出 */
  const directExport = useButton({
    onClick: async () => {
      const createTime = searchData.createTime;

      const [createStartTime, createEndTime] = momentRangeSplit(
        createTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const deliveryTime = searchData.deliveryTime;
      const [deliveryStartTime, deliveryEndTime] = momentRangeSplit(
        deliveryTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const upTime = searchData.upTime;
      const [changeStartTime, changeEndTime] = momentRangeSplit(
        upTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const completeAt = form.getFieldsValue().completeAt;
      const [completedStartTime, completedEndTime] = momentRangeSplit(
        completeAt,
        'YYYY-MM-DD HH:mm:ss',
      );
      const {
        outboundOrder,
        storageId,
        orderId,
        status,
        shipmentsOrderId,
        type,
        clientOrderId,
        controlStatus,
        logisticsTrackingNumber,
        isCountry,
        exceptionStatus,
        sku,
        salesmanName,
      } = searchData;
      const resp = await api.directExport({
        pageNum: 1,
        pageSize: 10,
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
          sku,
          changeStartTime,
          changeEndTime,
          salesmanName,
          completedStartTime,
          completedEndTime,
        },
      });
      if (resp) {
        exportData(resp, '直发单');
      }
    },
  });
  const commonExport = useButton({
    onClick: async () => {
      const createTime = searchData.createTime;

      const [createStartTime, createEndTime] = momentRangeSplit(
        createTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const deliveryTime = searchData.deliveryTime;
      const [deliveryStartTime, deliveryEndTime] = momentRangeSplit(
        deliveryTime,
        'YYYY-MM-DD HH:mm:ss',
      );

      const upTime = searchData.upTime;
      const [changeStartTime, changeEndTime] = momentRangeSplit(
        upTime,
        'YYYY-MM-DD HH:mm:ss',
      );

      const completeAt = form.getFieldsValue().completeAt;
      const [completedStartTime, completedEndTime] = momentRangeSplit(
        completeAt,
        'YYYY-MM-DD HH:mm:ss',
      );

      const {
        outboundOrder,
        storageId,
        orderId,
        status,
        shipmentsOrderId,
        type,
        clientOrderId,
        controlStatus,
        logisticsTrackingNumber,
        isCountry,
        exceptionStatus,
        sku,
        salesmanName,
      } = searchData;
      const resp = await api.commonExport({
        pageNum: 1,
        pageSize: 10,
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
          sku,
          changeStartTime,
          changeEndTime,
          salesmanName,
          completedStartTime,
          completedEndTime,
        },
      });
      if (resp) {
        exportData(resp, '出库单');
      }
    },
  });

  const submitToWeight = async (id: string) => {
    const hide = message.loading('提交中，请稍后...');
    try {
      const resp = await api.submitToWeight({ id });
      dispatch({
        type: 'outBoundOrder/search',
        payload: {
          searchData: {
            ...searchData,
            storageId: warehouseId,
          },
        },
      });

      dispatch({
        type: 'outBoundOrder/getStatusCount',
        payload: { storageId: warehouseId },
      });
    } catch (error) {}
    hide();
  };
  return {
    onChange,
    showLog,
    exceptModal,
    changeType,
    routerDetail,
    selected,
    onSelectChange,
    deductionStore,
    releaseStore,
    printModal,
    directExport,
    commonExport,
    submitToWeight,
  };
};

export const logModalHooks = (dispatch: Function) => {
  const onClose = () => {
    dispatch({
      type: 'outBoundOrder/_logVisibleChange',
      payload: {
        visible: false,
      },
    });
  };
  return {
    onClose,
  };
};
