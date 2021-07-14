import { useEffect } from 'react';
import { Form, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import { detailForDeal } from '@/services/exceptionPurchase';

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
      type: 'exceptionWarehouseProcessed/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'exceptionWarehouseProcessed/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'exceptionWarehouseProcessed/searchDataClear',
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
  const [dealResultModal] = useModal({
    onFetch: async params => {
      const resp = await detailForDeal({ exceptionNum: params.id });
      return resp.data;
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionWarehouseProcessed/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    dealResultModal,
  };
};
