import { useEffect } from 'react';
import { Form, message } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/thirdStore';
import { exportData } from '@/utils/exportData';
import useButton from '@/hooks/useButton';

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
      type: 'thirdStore/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({ type: 'thirdStore/search', payload: { searchData: values } });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'thirdStore/searchDataClear',
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, searchData: any) => {
  const [modal] = useModal({
    onFetch: async (params, setCancel) => {
      const hide = message.loading('查询中，请稍后...');
      const resp = await api.getDetail({ id: params.id }).finally(() => {
        hide();
      });
      return resp.data;
    },
  });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'thirdStore/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  /**导出 */
  const commonExport = useButton({
    onClick: async () => {
      const {
        sku,
        shortCode,
        storehouseId,
        customerId,
        customerName,
        containerNum,
        type,
        batchNumber,
        field_4,
        productSku,
      } = searchData;
      const resp = await api.commonExport({
        sku,
        shortCode,
        storehouseId,
        customerId,
        customerName,
        containerNum,
        type,
        batchNumber,
        field_4,
        productSku,
      });
      if (resp) {
        exportData(resp, '三级库存');
      }
    },
  });
  return {
    onChange,
    modal,
    commonExport,
  };
};
