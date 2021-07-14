import { useEffect, useRef, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/inventoryTurnOver';
import { namespace } from '@/models/overProduct';
import moment from 'moment';
import useButton from '@/hooks/useButton';
import { exportData } from '@/utils/exportData';
import { momentRangeSplit } from '@/utils';
import * as outBoundOrderApi from '@/services/outBoundOrder';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    const temp: any = {};
    if (!searchData.stockoutTime) temp.stockoutTime = dataRange.current;
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...temp, storehouseId: warehouseId } },
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
      payload: { storehouseId: warehouseId, stockoutTime: dataRange.current },
    });
  };

  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, searchData: any) => {
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
      productIds: selected.keys.map((item: string) => ({ id: item })),
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
    createMask,
    modal,
    selected,
    onSelectChange,
  };
};
