import React, { useCallback, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import * as api from '@/services/libraryList';
import { history } from 'umi';
import printRequest from '@/utils/printTwo';
import { momentRangeSplit } from '@/utils';

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
      type: 'libraryList/search',
      payload: { searchData: { storageId: warehouseId } },
    });
  }, [warehouseId]);

  const onSearch = async () => {
    const values = form.getFieldsValue();
    const { checkName, id, sku, status } = values;
    const timeRange = form.getFieldsValue().timeRange;
    const [beginDate, endDate] = momentRangeSplit(
      timeRange,
      'YYYY-MM-DD HH:mm:ss',
    );
    dispatch({
      type: 'libraryList/search',
      payload: {
        searchData: {
          checkName,
          id,
          sku,
          status,
          beginDate,
          endDate,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'libraryList/searchDataClear',
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
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<number>(0);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'libraryList/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  // 勾选的回调
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  // 点击查看或者订单下的数字
  const checkDetail = (record: any, type: number) => {
    dispatch({
      type: 'libraryList/saveCurrentItem',
      payload: {
        ...record,
      },
    });
    // type判断是查看还是， 1是越库批次详情，2是越库批次详情订单
    const url =
      type === 1
        ? `/librarylist/detail/${record.id}`
        : `/librarylist/${record.id}`;
    history.push(url);
  };

  // 越库设置查询
  const queryStatus = async (id: string) => {
    const result = await api.getCrossStatus({ storehouseId: id });
    if (result.code === 200) {
      setSelectedRadio(result.data);
    }
  };

  // 越库设置点击确定
  const onOk = useCallback(
    async (warehouseId: string) => {
      const result = await api.crossDatabaseSetting({
        storehouseId: warehouseId,
        status: selectedRadio,
      });
      if (result.code === 200 && result.data) {
        message.success('设置成功');
        setVisible(false);
        setSelectedRadio(0);
      }
    },
    [selectedRadio],
  );

  // 越库设置切换
  const radioChange = (e: any) => {
    setSelectedRadio(e.target.value);
  };

  // 批量打印,single:批量还是单个
  const batchPrint = useCallback(
    async (single: boolean, record?: any) => {
      if (selected?.keys.length <= 0 && !single) {
        message.error('请选择需打印的批次号');
        return;
      }
      let ids;
      if (single) {
        ids = [record.id];
      } else {
        ids = selected.keys;
      }
      const hide = message.loading('打印中，请稍后...');
      const resp: any = await await api
        .batchPrintRequest({ ids })
        .catch(e => {});
      hide();
      printRequest([
        {
          title: '打印越库批次号',
          url: resp.data,
        },
      ]);
    },
    [selected],
  );

  // 打印所有
  const batchPrintAll = useCallback(async () => {
    const hide = message.loading('打印中，请稍后...');
    const resp = await api.batchPrintAllRequest({});
    hide();
    printRequest([
      {
        title: '打印所有越库批次号',
        url: resp.data,
      },
    ]);
  }, [selected]);

  return {
    onChange,
    onSelectChange,
    selected,
    checkDetail,
    onOk,
    visible,
    setVisible,
    selectedRadio,
    radioChange,
    batchPrint,
    batchPrintAll,
    queryStatus,
  };
};
