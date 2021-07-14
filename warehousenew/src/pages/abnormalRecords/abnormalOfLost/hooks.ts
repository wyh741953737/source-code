import { useEffect, useRef } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/abnormalOfLost';
import { namespace } from '@/models/abnormalOfLost';
import moment from 'moment';
import useButton from '@/hooks/useButton';
import { exportData } from '@/utils/exportData';
import { momentRangeSplit } from '@/utils';
import * as outBoundOrderApi from '@/services/outBoundOrder';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    const temp: any = {};
    if (!searchData.stockoutTime) temp.stockoutTime = dataRange.current;
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...temp, storehouseId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: `${namespace}/searchDataClear`,
      payload: { storehouseId: warehouseId, stockoutTime: dataRange.current },
    });
  };
  /**
   * 导出
   */
  const exportBtn = useButton({
    onClick: async () => {
      const [stockoutTimeStart, stockoutTimeEnd] = momentRangeSplit(
        searchData.createAt,
      );
      const hide = message.loading('导出中，请稍后...');
      const resp = await api
        .exportData({
          clientOrderId: searchData.clientOrderId,
          orderId: searchData.orderId,
          logisticsTrackingNumber: searchData.logisticsTrackingNumber,
          sku: searchData.sku,
          variantNum: searchData.variantNum,
          createBy: searchData.stockoutName,
          operatorName: searchData.operatorName,
          storehouseId: searchData.storehouseId,
          status: searchData.status,
          stockoutTimeStart,
          stockoutTimeEnd,
        })
        .catch(e => {});
      hide();
      if (resp) {
        exportData(resp, '缺货异常记录');
      }
    },
  });
  return {
    form,
    onSearch,
    onClearSearch,
    exportBtn,
  };
};

export const indexHooks = (dispatch: Function, searchData: any) => {
  const find = (record: any) => {
    const { id, storehouseId } = record;
    Modal.confirm({
      title: '提示',
      content: '确定货已找到了吗？',
      onOk: async (values, p) => {
        await api.finded({ id, status: 1, storehouseId });
        message.success('提交成功');
        dispatch({ type: `${namespace}/search` });
      },
    });
  };
  const [lost] = useModal({
    onOk: async (values, p) => {
      await api.lost({
        id: p.id,
        stockQuantity: values.count,
        status: 2,
        remarks: values.remark,
        storehouseId: p.storehouseId,
      });
      lost.form.resetFields();
      message.success('提交成功');
      dispatch({ type: `${namespace}/search`, payload: {} });
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  // 日志详情
  const [logModal] = useModal({});

  const showLog = async (id: string) => {
    const hide = message.loading('查询中，请稍后...');
    try {
      const resp = await outBoundOrderApi.getLog({ id });
      logModal.show(resp.data);
    } catch (error) {}
    hide();
  };

  return {
    find,
    lost,
    onChange,
    showLog,
    logModal,
  };
};
