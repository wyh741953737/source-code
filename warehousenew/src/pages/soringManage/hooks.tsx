import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { namespace } from '@/models/soringManage';
import useModal from '@/hooks/useModal';
import * as api from '@/services/soringManage';
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
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
      payload: { searchData: { storehouseId: warehouseId, sortingStatus: 0 } },
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
      payload: { storehouseId: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
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

  const checkDetail = async (id: string) => {
    const hide = message.loading('查询中，请稍后...');
    try {
      const resp = await api.getDetailList({ id });
      logModal.show(resp.data);
    } catch (error) {}
    hide();
  };

  return {
    onChange,
    logModal,
    checkDetail,
  };
};
