import { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/containerManage';

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    const values = form.getFieldsValue();

    dispatch({
      type: 'expenseAppreciation/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({ type: 'expenseAppreciation/searchDataClear' });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  useEffect(() => {
    dispatch({ type: 'expenseAppreciation/search', payload: {} });
  }, []);
  const [modal] = useModal({
    onOk: async () => {
      dispatch({ type: 'expenseAppreciation/search', payload: {} });
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectionChange = (keys: any) => {
    setSelectedRowKeys(keys);
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'expenseAppreciation/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    onSelectionChange,
    modal,
  };
};
