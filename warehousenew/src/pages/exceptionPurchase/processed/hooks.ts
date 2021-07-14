import { useEffect } from 'react';
import { Form } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/exceptionPurchase';

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    const values = form.getFieldsValue();

    dispatch({
      type: 'exceptionPurchaseProcessed/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({ type: 'exceptionPurchaseProcessed/searchDataClear' });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [dealModal] = useModal({
    onFetch: async params => {
      return await api.detailForDeal({ exceptionNum: params.id });
    },
  });

  useEffect(() => {
    dispatch({ type: 'exceptionPurchaseProcessed/search', payload: {} });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionPurchaseProcessed/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  return {
    onChange,
    dealModal,
  };
};
