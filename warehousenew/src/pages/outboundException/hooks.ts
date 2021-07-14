import React, { useEffect } from 'react';
import { Form } from 'antd';
// import  * as api from '@/services/outboundException'
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
    dispatch({
      type: 'outboundException/search',
      payload: { searchData: { storehouseId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'outboundException/search',
      payload: {
        searchData: {
          ...values,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'outboundException/searchDataClear',
      payload: { storehouseId: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, searchData: any) => {
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'outboundException/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  return {
    onChange,
  };
};
