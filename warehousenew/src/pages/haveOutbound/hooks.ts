import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import * as api from '@/services/weightOutbound';
import { exportData } from '@/utils/exportData';

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
      type: 'haveOutbound/search',
      payload: { searchData: { storageId: warehouseId, status: 1 } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const time = form.getFieldsValue().createTime;
    let weighingTimeStart = time
      ? moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    let weighingTimeEnd = time
      ? moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    dispatch({
      type: 'haveOutbound/search',
      payload: {
        searchData: {
          ...values,
          weighingTimeStart,
          weighingTimeEnd,
          status: 1,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'haveOutbound/searchDataClear',
      payload: { storageId: warehouseId, status: 1 },
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

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'haveOutbound/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const onSelectChange = (keys: any, rows: any) => {
    console.log(keys, rows, 'keys==========rows');
    setSelected({ keys, rows });
  };

  const exportExcel = async () => {
    const hide = message.loading('导出中，请稍后...');
    const resp = await api
      .batchExportExcel({
        ...searchData,
        ids: selected.keys,
      })
      .catch(e => {});
    hide();
    if (resp) {
      exportData(resp, '称重出库列表');
    }
  };

  return {
    onChange,
    onSelectChange,
    selected,
    exportExcel,
  };
};
