import React, { useEffect, useRef } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/storeAdjust';
import * as api from '@/services/storeAdjust';
import useModal from '@/hooks/useModal';
import useRowSelection from '@/hooks/useRowSelection';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import printRequest from '@/utils/printTwo';

const { confirm } = Modal;
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  const [form] = Form.useForm();
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
          updateTime: searchData.updateTime || dataRange.current,
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
        updateTime: dataRange.current,
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

export const indexHooks = (dispatch: Function, dataSource: []) => {
  const [rowSelection, selected, setSelected] = useRowSelection();

  useEffect(() => {
    setSelected({ keys: [], rows: [] });
  }, [dataSource]);
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  /**
   * 放弃按钮
   */
  const giveUp = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认放弃调整吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.giveUp({
          inventoryAlterDTOS: selected.keys.map(k => ({ id: k })),
        });
        message.success('放弃成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {},
    });
  };

  /**
   * 调整按钮
   */
  const adjust = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认提交调整吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.adjust({
          inventoryAlterDTOS: selected.keys.map(k => ({ id: k })),
        });
        message.success('调整成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {},
    });
  };
  /**
   * 查询可调整弹框
   */
  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (e, values, p) => {
      confirmModal.show({ cond: values, from: p });
      return Promise.reject();
    },
  });
  /**
   * 填写调整目标弹框
   */
  const [confirmModal] = useModal({
    onOk: async (values, p) => {
      await api.add({
        ...values,
        id: confirmModal.params?.from.id,
      });
      modal.close();
      message.success('新增成功');
      dispatch({ type: `${namespace}/search` });
    },
  });

  // 条码打印
  const [simpleForm] = useModal({
    onOk: async values => {
      const record: any = simpleForm.params;
      const { storehouseInventoryInfoId } = record;
      const { subStandardQuantity } = values;
      const makeupParams: any = {
        quantity: subStandardQuantity,
        storehouseInventoryInfoId: storehouseInventoryInfoId,
      };
      const resp: any = await api.printProductCode(makeupParams).catch(e => {});
      printRequest([
        {
          title: '条码打印',
          url: resp.data,
        },
      ]);
    },
  });
  return {
    onChange,
    rowSelection,
    giveUp,
    adjust,
    modal,
    confirmModal,
    simpleForm,
  };
};
