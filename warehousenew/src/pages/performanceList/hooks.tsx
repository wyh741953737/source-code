import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import * as api from '@/services/performanceList';
import { namespace } from '@/models/performanceList';
import { exportData } from '@/utils/exportData';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ createTime: [moment(), moment()], ...searchData });
  }, [searchData]);
  useEffect(() => {
    let startTime = moment().format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: { storeId: warehouseId, group: 1, startTime, endTime },
      },
    });
    return () => {
      onClearSearch();
    };
  }, [warehouseId]);
  const onSearch = async () => {
    await form.validateFields();
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
      payload: { storeId: warehouseId, group: 1, startTime, endTime },
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

  useEffect(() => {
    dispatch({
      type: `${namespace}/saveThreshold`,
      payload: {},
    });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  const [editModal] = useModal({
    onOk: async (values, p) => {
      const { group, employeeId, storehouseId, employeeName } = p;
      const { remarks, scoreType, quantity } = values;
      try {
      } catch (e) {}
      dispatch({ type: `${namespace}/search`, payload: {} });
      return true;
    },
  });

  const exportExcel = async () => {
    const hide = message.loading('导出中，请稍后...');
    const resp = await api.exportPerfmance({
      ...searchData,
    });
    hide();
    if (resp) {
      exportData(resp, '绩效列表');
    }
  };

  return {
    onChange,
    selected,
    onSelectChange,
    editModal,
    exportExcel,
  };
};
