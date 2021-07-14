import { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/moveInWarehouse';
import { MOVESTATUS } from '@/enum.config';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    form.setFieldsValue({ warehouse: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: 'moveInWarehouse/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'moveInWarehouse/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'moveInWarehouse/searchDataClear',
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any) => {
  useEffect(() => {
    setSelected({ keys: [], rows: [] });
  }, [dataSource]);
  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (e, values, p) => {
      confirmModal.show({ cond: values, from: p });
      return Promise.reject();
    },
  });
  const [confirmModal] = useModal({
    closeAndClear: true,
    onOk: async (values, p) => {
      const {
        toContainerId,
        toContainerNum,
        toContainerType,
      } = values.toContainer;
      await api.add({
        id: p.id,
        variantSku: p.sku,
        shortCode: p.shortCode,
        storageName: p.storageName.value,
        toContainerId,
        toContainerNum,
        toContainerType,
        moveQuantity: values.moveQuantity,
        batchNumber: p.batchNumber,
        inventoryInfoBatchId: p.inventoryInfoBatchId,
        orderInfo: values.orderInfo,
      });
      modal.close();
      message.success('新增移动成功');
      dispatch({ type: 'moveInWarehouse/search' });
    },
  });
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectionChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'moveInWarehouse/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const undo = async () => {
    if (selected.keys.length === 0) return message.warn('至少选择一个');
    if (selected.rows.find((r: any) => r.status !== MOVESTATUS.pending.key)) {
      return message.error('只有待处理状态的才可以废弃');
    }
    Modal.confirm({
      title: '放弃提示',
      content: '确定要放弃吗？',
      onOk: async () => {
        const hide = message.loading('正在放弃中...');
        try {
          await api.giveUp({
            moveCodeList: selected.rows.map((r: any) => r.moveCode),
          });
          message.success('放弃成功');
          dispatch({ type: 'moveInWarehouse/search' });
        } catch (e) {}
        hide();
      },
    });
  };
  const doingMove = () => {
    if (selected.keys.length === 0) return message.warn('至少选择一个');
    if (selected.rows.find((r: any) => r.status !== MOVESTATUS.pending.key)) {
      return message.error('只有待处理状态的才可以提交移动');
    }
    Modal.confirm({
      title: '提交移动提示',
      content: '确认提交移动吗？',
      onOk: async () => {
        const hide = message.loading('正在提交移动中...');
        try {
          await api.submit({
            moveCodeList: selected.rows.map((r: any) => r.moveCode),
          });
          message.success('提交移动成功');
          dispatch({ type: 'moveInWarehouse/search' });
        } catch (e) {
          if (e.code === 100818) {
            // 提交数据有变动，部分成功
            dispatch({ type: 'moveInWarehouse/search' });
            Modal.warning({
              title: '部分提交成功提示',
              content: `以下移动单号：${e.data.join(
                ',',
              )} 由于数据变化提交失败，剩余部分已经提交成功`,
            });
          } else {
            message.error(e.message);
          }
        }
        hide();
      },
    });
  };
  return {
    onChange,
    onSelectionChange,
    modal,
    undo,
    doingMove,
    selected,
    confirmModal,
  };
};

export const recommendHooks = () => {
  const [recommendModal] = useModal();

  return {
    recommendModal,
  };
};
