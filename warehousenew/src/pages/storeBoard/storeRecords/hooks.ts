import { useEffect } from 'react';
import { Form } from 'antd';

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
      type: 'storeRecords/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({ type: 'storeRecords/search', payload: { searchData: values } });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'storeRecords/searchDataClear',
      payload: { warehouse: warehouseId },
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
      type: 'storeRecords/search',
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
