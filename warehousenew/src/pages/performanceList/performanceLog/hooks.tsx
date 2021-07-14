import React, { useEffect } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import * as api from '@/services/performanceList';
const namespace = 'performanceLog';
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  currentItem: any,
) => {
  const [form] = Form.useForm();
  const { storehouseId, group, employeeId } = currentItem;
  useEffect(() => {
    form.setFieldsValue({ createTime: [moment(), moment()], ...searchData });
  }, [searchData]);
  useEffect(() => {
    let startTime = moment().format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          storeId: storehouseId,
          group,
          employeeId,
          startTime,
          endTime,
        },
      },
    });

    return () => {
      onClearSearch();
    };
  }, []);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const time = form.getFieldsValue().createTime;
    let startTime = time ? moment(time[0]).format('YYYY-MM-DD') : '';
    let endTime = time ? moment(time[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          ...values,
          startTime,
          endTime,
          storeId: storehouseId,
          group,
          employeeId,
        },
      },
    });
  };
  const onClearSearch = () => {
    let startTime = moment().format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    form.resetFields();
    dispatch({
      type: `${namespace}/searchDataClear`,
      payload: {
        storeId: storehouseId,
        group,
        employeeId,
        startTime,
        endTime,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, currentItem: any) => {
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const [editModal] = useModal({
    onOk: async (values, p) => {
      const { group, employeeId, storehouseId, employeeName } = currentItem;
      const { remarks, scoreType, quantity } = values;
      try {
        const resp = await api.pointChange({
          group,
          remarks,
          quantity: scoreType == 1 ? quantity : -quantity,
          employeeId,
          storehouseId,
          employeeName,
        });
      } catch (e) {}
      dispatch({ type: `${namespace}/search`, payload: {} });
      return true;
    },
  });

  return {
    onChange,

    editModal,
  };
};
