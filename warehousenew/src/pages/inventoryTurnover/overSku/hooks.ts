import { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import * as api from '@/services/inventoryTurnOver';
import { namespace } from '@/models/overSku';
import useButton from '@/hooks/useButton';
import { EXPRESSSTATUS } from '@/enum.config';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';
import * as printApi from '@/services/packageRecord';
import useModal from '@/hooks/useModal';
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
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { storehouseId: warehouseId } },
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
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
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
   * 生成理货单
   */
  const createMask = async () => {
    if (selected.rows.length === 0 || selected.rows.length > 10) {
      return message.warn('选择数量在1-10之间');
    }
    const params = {
      skuIds: selected.keys.map((item: string) => ({ id: item })),
    };
    modal.show(params);
  };

  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (values, p) => {
      console.log(values, 'values', p);
      try {
        await api.addStorehouseTally({ ...p });
        message.success('新增成功');
        dispatch({ type: `${namespace}/search` });
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  return {
    onChange,
    onSelectChange,
    selected,
    createMask,
    modal,
  };
};
