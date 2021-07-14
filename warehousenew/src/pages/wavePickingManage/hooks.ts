import { Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import * as api from '@/services/wavePickingManage';
import { namespace } from '@/models/wavePickingManage';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState(
    searchData.selectedOption,
  );
  useEffect(() => {
    form.setFieldsValue({ ...searchData });
    dispatch({
      type: `${namespace}/_saveStore`,
      payload: { storehouseId: searchData.storehouseId },
    });
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { storehouseId: warehouseId } },
    });
  }, [warehouseId]);
  const valuesChanged = (changedValues: any) => {
    if ('selectedOption' in changedValues) {
      setSelectedOption(changedValues.selectedOption);
    }
  };
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
      payload: { storehouseId: warehouseId },
    });
  };
  return {
    form,
    selectedOption,
    valuesChanged,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [modal] = useModal({
    closeAndClear: true,
    onOk: async (values, storehouseName) => {
      console.log('@@@@@', values, storehouseName);
      const { customerInfo = [], logisticsChannelInfo = [] } = values;
      const [start, end] = values.date || [];
      try {
        await api.add({
          storehouseId: values.storehouseId,
          storehouseName,
          waveType: values.waveType,
          waveName: values.waveName,
          orderQuantityLimit: values.orderQuantityLimit,
          commodityRules: values.commodityRules,
          whetherPod: values.whetherPod,
          whetherTop: values.whetherTop,
          orderIdList: values.orderIdList ? values.orderIdList.split(',') : [],
          isChina: values.isChina,
          shipmentsOrderIdList: values.shipmentsOrderIdList,
          customerInfo:
            customerInfo.length > 0
              ? JSON.stringify(
                  (customerInfo || []).map((c: any) => ({
                    id: c.value,
                    name: c.label,
                  })),
                )
              : undefined,
          logisticsChannelInfo:
            logisticsChannelInfo.length > 0
              ? JSON.stringify(
                  (values.logisticsChannelInfo || []).map((l: any) => ({
                    id: l.value,
                    name: l.label,
                  })),
                )
              : undefined,
          firstOrderType: values.firstOrderType,
          orderType: values.orderType,
          minNumber: values.sameSku && values.sameSku[0],
          maxNumber: values.sameSku && values.sameSku[1],
          whetherCommonRules: values.whetherCommonRules,
          areaBatch: values.areaBatch
            ? Array.isArray(values.areaBatch)
              ? values.areaBatch.join(',')
              : values.areaBatch
            : undefined,
          remark: values.remark,
          completeBegin: start && start.format('YYYY-MM-DD HH') + ':00:00',
          completeEnd: end && end.format('YYYY-MM-DD HH') + ':59:59',
        });
      } catch (error) {
        console.log(error, 'error=======');
      }
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
  const onRepeal = (record: any) => {
    Modal.confirm({
      title: '撤销波次',
      content:
        '确认后则该波次将被撤销，且该波次对应的订单将被释放，你还要继续吗？',
      onOk: async () => {
        return new Promise((resolve, reject) => {
          api.repeal({ id: record.id }).then(
            () => {
              dispatch({ type: `${namespace}/search` });
              resolve('');
            },
            () => {
              console.log('111111111');
              reject('error');
            },
          );
        }).catch(() => console.log('出错!'));
      },
    });
  };
  return {
    onChange,
    modal,
    onRepeal,
  };
};
