import { useEffect } from 'react';
import { Form, message } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/exceptionRecords';

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
    form.setFieldsValue({ storage: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: 'exceptionRecords/search',
      payload: { searchData: { storage: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'exceptionRecords/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'exceptionRecords/searchDataClear',
      payload: { storage: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [find] = useModal({
    onOk: async (values, p) => {
      await api.finded({
        id: p.id,
        quantity: p.quantity,
        remark: values.remark,
      });
      find.form.resetFields();
      message.success('提交成功');
      dispatch({ type: 'exceptionRecords/search', payload: {} });
    },
  });
  const [lost] = useModal({
    onOk: async (values, p) => {
      const exceptionTypeArr = [1, 4];
      try {
        const resp = await api.lost({
          id: p.id,
          quantity: values.count,
          remark: values.remark,
        });
        lost.form.resetFields();
        message.success('提交成功');
        if (
          exceptionTypeArr.indexOf(p.exceptionType) === -1 &&
          values.count !== p.quantity
        ) {
          window.open(resp.data);
        }
        dispatch({ type: 'exceptionRecords/search', payload: {} });
      } catch (error) {}
    },
  });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionRecords/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  return {
    find,
    lost,

    onChange,
  };
};
