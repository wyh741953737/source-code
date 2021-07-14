import React, { useEffect, useRef, useState } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/tallyBatch';
import useRowSelection from '@/hooks/useRowSelection';
import * as api from '@/services/tallyBatch';
import moment from 'moment';
import style from './index.less';
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          createTime: searchData.createTime || dataRange.current,
          updateTime: searchData.updateTime || dataRange.current,
          storehouseId: warehouseId,
        },
      },
    });
    dispatch({
      type: `${namespace}/_changeDetail`,
      payload: {
        detail: [],
      },
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
      payload: {
        createTime: dataRange.current,
        updateTime: dataRange.current,
        storehouseId: warehouseId,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any[]) => {
  const [rowSelection, selected] = useRowSelection();
  const [activeIndex, setActiveIndex] = useState<number>();
  const [detailLoaing, setDetailLoading] = useState<boolean>(false);
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const onRowSelect = (record: any, index: number | undefined) => {
    setDetailLoading(true);
    dispatch({
      type: `${namespace}/detail`,
      payload: {
        tallyBatchId: record?.id,
      },
    }).finally(() => {
      setDetailLoading(false);
    });

    setActiveIndex(index);
  };
  const printSelect = async (record: any) => {
    if (selected.keys.length === 0) return message.warning('请选择记录');
    const batchNumArr = selected.rows.map((item: any) => item.batchNum);
    const resp = await api.print(batchNumArr);
    window.open(resp.data);
  };
  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };

  return {
    detailLoaing,
    onChange,
    rowSelection,
    onRowSelect,
    printSelect,
    setClassName,
  };
};
