import React, { useEffect, useRef, useState } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/storeTransfer';
import useRowSelection from '@/hooks/useRowSelection';
import * as api from '@/services/storeTransfer';
import useModal from '@/hooks/useModal';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import style from './index.less';
const { confirm } = Modal;
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          createTime: searchData.createTime || dataRange.current,
          transTime: searchData.transTime || dataRange.current,
          storehouseId: warehouseId,
        },
      },
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
      payload: {
        createTime: dataRange.current,
        transTime: dataRange.current,
        storehouseId: warehouseId,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any[]) => {
  const [rowSelection, selected] = useRowSelection();
  const [rowInfo, setRowInfo] = useState<any[]>();
  const [activeIndex, setActiveIndex] = useState<number>();
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  useEffect(() => {
    setRowInfo([]);
  }, [dataSource]);
  /**
   * 放弃按钮
   */
  const giveUp = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认放弃转移吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.giveUp({
          inventoryTransferDTOS: selected.keys.map(k => ({ id: k })),
        });
        message.success('放弃成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {},
    });
  };
  /**
   * 转移按钮
   */
  const transfer = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认提交转移吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.transfer({
          inventoryTransferDTOS: selected.keys.map(k => ({ id: k })),
        });
        message.success('转移成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  /**
   * 入库异常
   */
  const abnormal = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认提交入库异常吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.abnormal({
          inventoryTransferDTOS: selected.keys.map(k => ({ id: k })),
        });
        message.success('新增入库异常成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  /**
   * 查询可转移弹框
   */
  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (e, values, p) => {
      confirmModal.form.setFieldsValue({
        cjNumber: p.cjNumber,
        inventoryType: p.type,
        quantity: undefined,
      });
      confirmModal.show({ cond: values, from: p });
      return Promise.reject();
    },
  });
  /**
   * 填写转移目标弹框
   */
  const [confirmModal] = useModal({
    onOk: async values => {
      await api.add({
        id: confirmModal.params?.from.id,
        ...values,
      });
      modal.close();
      message.success('新增成功');
      dispatch({ type: `${namespace}/search` });
    },
  });
  const onRowSelect = (record: any, index: number | undefined) => {
    setRowInfo([
      {
        key: 'Form',
        customerId: record.customerId,
        customerName: record.customerName,
        inventoryType: record.inventoryType,
      },
      {
        key: 'To',
        customerId: record.toCustomerId,
        customerName: record.toCustomerName,
        inventoryType: record.toInventoryType,
      },
    ]);

    setActiveIndex(index);
  };
  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };
  return {
    onChange,
    rowSelection,
    giveUp,
    transfer,
    abnormal,
    modal,
    confirmModal,
    onRowSelect,
    rowInfo,
    setClassName,
  };
};
