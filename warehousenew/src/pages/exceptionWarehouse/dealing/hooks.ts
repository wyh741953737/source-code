import { useEffect } from 'react';
import { Form, message } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/exceptionWarehouse';
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
      type: 'exceptionWarehouseDealing/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'exceptionWarehouseDealing/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'exceptionWarehouseDealing/searchDataClear',
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
  const [resultModal] = useModal({
    onFetch: async params => {
      const resp = await detailForDeal({ exceptionNum: params.id });
      return resp.data;
    },
  });
  const [dealConfirmModal] = useModal({
    onOk: async (values, p) => {
      await api.confirm({
        receiptExceptionIdList: [p.id],
        status: 1002,
        remark: values.remark,
      });
      message.success('处理确认成功');
      dispatch({ type: 'exceptionWarehouseDealing/search' });
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionWarehouseDealing/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    resultModal,
    dealConfirmModal,
  };
};
